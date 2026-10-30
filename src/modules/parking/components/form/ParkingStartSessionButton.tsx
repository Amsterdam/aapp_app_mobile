import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {alerts} from '@/modules/parking/alerts'
import {ParkingDashboardBottomSheetVariant} from '@/modules/parking/components/dashboard/bottomsheet/bottomsheetVariants'
import type {ParkingSessionFormValues} from '@/modules/parking/components/form/ParkingSessionFormProvider'
import {ParkingAddMoneyButton} from '@/modules/parking/components/ParkingAddMoneyButton'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'
import {useStartSessionMutation} from '@/modules/parking/service'
import {useOpenBottomsheetIfSurveyShouldShow} from '@/modules/survey/exports/useOpenBottomsheetIfSurveyShouldShow'
import {useAlert} from '@/store/slices/alert'
import {Duration} from '@/types/duration'
import type {NonOptional} from '@/types/utils'

type FieldValues = NonOptional<ParkingSessionFormValues, 'licensePlate'>

export const ParkingStartSessionButton = () => {
  const {
    handleSubmit,
    clearErrors,
    formState: {isSubmitting, errors},
    setError,
  } = useFormContext<FieldValues>()
  const {report_code, permit_type} = useCurrentParkingPermit()
  const {setAlert} = useAlert()
  const [startSession, {isLoading}] = useStartSessionMutation()
  const navigation = useNavigation()
  const {goBack} = navigation
  const openWebUrl = useOpenWebUrl()
  const {registerDeviceIfPermitted} = useRegisterDevice()
  const openSurveyBottomsheet = useOpenBottomsheetIfSurveyShouldShow(
    'parking-start-session',
  )

  const isTimebalanceInsufficient =
    errors.root?.serverError?.message === 'SSP_TIME_BALANCE_INSUFFICIENT' ||
    errors.root?.localError?.type === 'isTimeBalanceInsufficient'

  const isWalletBalanceInsufficient =
    errors.root?.serverError?.message === 'SSP_BALANCE_TOO_LOW' ||
    errors.root?.localError?.type === 'isWalletBalanceInsufficient'

  const onSubmit = useCallback(
    ({
      startTime,
      endTime,
      amount,
      licensePlate,
      parking_machine,
      parking_machine_favorite,
    }: FieldValues) => {
      clearErrors('root.serverError')

      // TODO: check if the limit of current active parking sessions is not reached
      if (licensePlate?.vehicle_id) {
        const paymentData = amount
          ? {
              balance: {
                amount,
                currency: 'EUR',
              },
              redirect: {
                merchant_return_url:
                  'amsterdam://parking/start-session-and-increase-balance/return',
              },
              locale: 'nl',
            }
          : {}

        return startSession({
          parking_session: {
            end_date_time: endTime?.toJSON(),
            parking_machine,
            parking_machine_favorite: !!parking_machine_favorite,
            report_code: report_code.toString(),
            start_date_time: startTime.toJSON(),
            vehicle_id: licensePlate?.vehicle_id,
          },
          ...paymentData,
        })
          .unwrap()
          .then(
            result => {
              if (result.redirect_url) {
                openWebUrl(result.redirect_url)
              } else {
                setAlert(alerts.startSessionSuccess)
              }

              void registerDeviceIfPermitted(true)
              setTimeout(
                () =>
                  openSurveyBottomsheet(
                    ParkingDashboardBottomSheetVariant.survey,
                  ),
                Duration.normal,
              )
              navigation.popTo(ParkingRouteName.dashboard)
            },
            (error: {
              data?: {code?: string; detail?: string}
              status?: string
            }) => {
              const detail = error.data?.detail || ''
              const code = error?.data?.code

              if (code === 'SSP_PARKING_MACHINE_NOT_IN_ZONE') {
                setError('parking_machine', {
                  type: 'manual',
                  message:
                    'Deze parkeerautomaat ligt buiten het vergunninggebied. Kies een andere automaat.',
                })
              } else if (code === 'SSP_NOT_FOUND') {
                setError('parking_machine', {
                  type: 'manual',
                  message:
                    'Deze parkeerautomaat bestaat niet. Kies een andere automaat.',
                })
              } else if (code === 'SSP_START_TIME_IN_PAST') {
                setError('startTime', {
                  type: 'manual',
                  message: 'Starttijd mag niet in het verleden liggen.',
                })
              } else if (code === 'SSP_START_TIME_INVALID') {
                setError('startTime', {
                  type: 'manual',
                  message: 'Deze starttijd is niet toegestaan.',
                })
              } else {
                setError('root.serverError', {
                  type: error?.status,
                  message: code ?? detail,
                })
              }
            },
          )
      }
    },
    [
      clearErrors,
      startSession,
      report_code,
      registerDeviceIfPermitted,
      navigation,
      openWebUrl,
      setAlert,
      openSurveyBottomsheet,
      setError,
    ],
  )

  if (isTimebalanceInsufficient) {
    return (
      <Button
        label="Sluiten"
        onPress={goBack}
        testID="ParkingStartSessionCloseButton"
      />
    )
  }

  if (isWalletBalanceInsufficient) {
    return <ParkingAddMoneyButton />
  }

  return (
    <Button
      disabled={isSubmitting || isLoading || !!errors?.parking_machine}
      icon={{name: 'parking-start'}}
      isLoading={isLoading}
      label="Bevestig parkeersessie"
      onPress={handleSubmit(onSubmit)}
      testID={`ParkingStartSession${permit_type}Button`}
      variant="primary"
    />
  )
}
