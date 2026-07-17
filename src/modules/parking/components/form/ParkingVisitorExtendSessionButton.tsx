import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useStartSessionMutation} from '@/modules/parking/service'
import {useAlert} from '@/store/slices/alert'
import {Dayjs} from '@/utils/datetime/dayjs'

type FieldValues = {
  amount?: number
  endTime?: Dayjs
  licensePlate: {
    vehicle_id: string
    visitor_name?: string
  }
  parking_machine?: string
  ps_right_id: number
  report_code: string
  startTime: Dayjs
}

export const ParkingVisitorExtendSessionButton = () => {
  const {handleSubmit, formState} = useFormContext<FieldValues>()
  const [startSession, {isLoading}] = useStartSessionMutation()

  const navigation = useNavigation()
  const openWebUrl = useOpenWebUrl()
  const {setAlert} = useAlert()

  const onSubmit = useCallback(
    ({
      startTime,
      endTime,
      report_code,
      ps_right_id,
      amount,
      licensePlate: {vehicle_id},
      parking_machine,
    }: FieldValues) => {
      if (endTime && startTime.isBefore(endTime)) {
        return startSession({
          parking_session: {
            report_code,
            vehicle_id,
            end_date_time: endTime.toJSON(),
            start_date_time: startTime.toJSON(),
            parking_machine,
          },
          remove_notifications_ps_right_id: ps_right_id,
          ...(amount
            ? {
                balance: {
                  amount,
                  currency: 'EUR',
                },
                redirect: {
                  merchant_return_url:
                    'amsterdam://parking/adjust-session-and-increase-balance/return',
                },
                locale: 'nl',
              }
            : {}),
        })
          .unwrap()
          .then(
            result => {
              if (result.redirect_url) {
                openWebUrl(result.redirect_url)
              } else {
                setAlert(alerts.adjustSessionSuccess)
              }

              navigation.popToTop()
            },
            (error: {
              data?: {code?: string; detail?: string}
              status?: string
            }) => {
              if (error?.data?.code === 'SSP_SESSION_NOT_ACTIVE') {
                setAlert(alerts.inactiveSessionFailed)
              }
            },
          )
      }
    },
    [startSession, navigation, openWebUrl, setAlert],
  )

  return (
    <Button
      disabled={formState.isSubmitting || isLoading}
      icon={{name: 'parking-start'}}
      isLoading={isLoading}
      label="Start parkeersessie"
      onPress={handleSubmit(onSubmit)}
      testID="ParkingVisitorExtendSessionButton"
      variant="primary"
    />
  )
}
