import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useActivateSessionMutation} from '@/modules/parking/service'
import {useAlert} from '@/store/slices/alert'

type FieldValues = {
  licensePlate: {vehicle_id: string; visitor_name: string}
}

export const ParkingActivateLicensePlateButton = () => {
  const {goBack} = useNavigation()
  const currentPermit = useCurrentParkingPermit()
  const {setAlert} = useAlert()

  const [activateSession, {isLoading}] = useActivateSessionMutation()

  const {
    handleSubmit,
    formState: {isSubmitting},
    setError,
  } = useFormContext<FieldValues>()

  const {report_code} = currentPermit

  const onSubmit = useCallback(
    ({licensePlate}: FieldValues) =>
      activateSession({
        report_code: report_code.toString(),
        vehicle_id: licensePlate.vehicle_id,
      })
        .unwrap()
        .then(
          () => {
            setAlert(alerts.startSessionSuccess)
            goBack()
          },
          (error: {
            data?: {code?: string; detail?: string}
            status?: string
          }) => {
            if (error.data?.code === 'SSP_SESSION_ALREADY_EXISTS') {
              setError('licensePlate', {
                message: 'Dit kenteken is al actief',
                type: 'value',
              })

              return
            }

            setError('licensePlate', {
              message: 'Er ging iets fout, probeer het later opnieuw',
              type: 'value',
            })
          },
        ),
    [activateSession, report_code, goBack, setAlert, setError],
  )

  return (
    <Button
      disabled={isSubmitting || isLoading}
      icon={{name: 'parking-start'}}
      isLoading={isLoading}
      label="Activeer kenteken"
      onPress={handleSubmit(onSubmit)}
      testID={`ParkingActivateLicensePlate${currentPermit.permit_type}Button`}
      variant="primary"
    />
  )
}
