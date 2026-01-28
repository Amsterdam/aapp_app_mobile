import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useRegisterDevice} from '@/hooks/useRegisterDevice'
import {alerts} from '@/modules/parking/alerts'
import {ParkingAddMoneyButton} from '@/modules/parking/components/ParkingAddMoneyButton'
import {ParkingDashboardBottomSheetVariant} from '@/modules/parking/components/dashboard/bottomsheet/bottomsheetVariants'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useStartSessionMutation} from '@/modules/parking/service'
import {useVisitorVehicleId} from '@/modules/parking/slice'
import {useOpenBottomsheetIfSurveyShouldShow} from '@/modules/survey/exports/useOpenBottomsheetIfSurveyShouldShow'
import {useAlert} from '@/store/slices/alert'
import {Duration} from '@/types/duration'
import {Dayjs} from '@/utils/datetime/dayjs'

export type SessionFieldValues = {
  amount?: number
  endTime?: Dayjs
  licensePlate?: {vehicle_id: string; visitor_name: string}
  parking_machine?: string
  parking_machine_favorite?: boolean
  paymentZoneId?: string
  startTime: Dayjs
  vehicle_id?: string
}

export const ParkingStartSessionButton = () => {
  const {
    handleSubmit,
    clearErrors,
    formState: {isSubmitting, errors},
    setError,
  } = useFormContext<SessionFieldValues>()
  const {report_code, permit_type} = useCurrentParkingPermit()
  const {setVisitorVehicleId} = useVisitorVehicleId()
  const {setAlert} = useAlert()
  const [startSession, {isLoading}] = useStartSessionMutation()
  const {goBack} = useNavigation()
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
      paymentZoneId,
      vehicle_id: visitorVehicleId,
    }: SessionFieldValues) => {
      clearErrors('root.serverError')
      const vehicleId = licensePlate?.vehicle_id ?? visitorVehicleId

      // TODO:
      // check if the limit of current active parking sessions is not reached
      if (vehicleId) {
        return startSession({
          parking_session: {
            end_date_time: endTime?.toJSON(),
            parking_machine,
            parking_machine_favorite: !!parking_machine_favorite,
            payment_zone_id: paymentZoneId,
            report_code: report_code.toString(),
            start_date_time: startTime.toJSON(),
            vehicle_id: vehicleId,
          },
          ...(amount
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
            : {}),
        })
          .unwrap()
          .then(
            result => {
              if (visitorVehicleId) {
                setVisitorVehicleId(visitorVehicleId)
              }

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
              goBack()
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
              }

              if (code === 'SSP_NOT_FOUND') {
                setError('parking_machine', {
                  type: 'manual',
                  message:
                    'Deze parkeerautomaat bestaat niet. Kies een andere automaat.',
                })
              }

              if (code === 'SSP_START_TIME_IN_PAST') {
                setError('startTime', {
                  type: 'manual',
                  message: 'Starttijd mag niet in het verleden liggen.',
                })

                return
              }

              if (code === 'SSP_START_TIME_INVALID') {
                setError('startTime', {
                  type: 'manual',
                  message: 'Deze starttijd is niet toegestaan.',
                })

                return
              }

              setError('root.serverError', {
                type: error?.status,
                message: code ?? detail,
              })
            },
          )
      }
    },
    [
      clearErrors,
      startSession,
      report_code,
      registerDeviceIfPermitted,
      goBack,
      setVisitorVehicleId,
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

  if (!isWalletBalanceInsufficient) {
    return <ParkingAddMoneyButton />
  }

  return (
    <Button
      disabled={isSubmitting || isLoading || !!errors?.parking_machine}
      iconName="parking-start"
      isLoading={isLoading}
      label="Bevestig parkeersessie"
      onPress={handleSubmit(onSubmit)}
      testID={`ParkingStartSession${permit_type}Button`}
      variant="primary"
    />
  )
}
