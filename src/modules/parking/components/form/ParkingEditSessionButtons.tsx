import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {Column} from '@/components/ui/layout/Column'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useEditSessionMutation} from '@/modules/parking/service'
import {useAlert} from '@/store/slices/alert'
import {Dayjs} from '@/utils/datetime/dayjs'

type FieldValues = {
  amount?: number
  endTime?: Dayjs
  licensePlate: {
    vehicle_id: string
    visitor_name?: string
  }
  ps_right_id: number
  report_code: string
  startTime: Dayjs
}

export const ParkingEditSessionButtons = () => {
  const {handleSubmit, formState} = useFormContext<FieldValues>()
  const [editSession, {isLoading}] = useEditSessionMutation()

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
    }: FieldValues) => {
      if (endTime && startTime.isBefore(endTime)) {
        return editSession({
          parking_session: {
            report_code,
            ps_right_id,
            vehicle_id,
            end_date_time: endTime.toJSON(),
            start_date_time: startTime.toJSON(),
          },
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
              } else {
                setAlert(alerts.adjustSessionFailed)
              }
            },
          )
      }
    },
    [editSession, navigation, openWebUrl, setAlert],
  )

  return (
    <Column gutter="md">
      <Button
        disabled={formState.isSubmitting || isLoading}
        isLoading={isLoading}
        label="Bevestig nieuwe eindtijd"
        onPress={handleSubmit(onSubmit)}
        testID="ParkingEditSessionButton"
        variant="primary"
      />
      <Button
        label="Annuleren"
        onPress={navigation.goBack}
        testID="ParkingEditSessionButton"
        variant="secondary"
      />
    </Column>
  )
}
