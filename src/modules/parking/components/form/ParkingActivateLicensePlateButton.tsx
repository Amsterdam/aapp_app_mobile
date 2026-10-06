import {useCallback} from 'react'
import {useFormContext} from 'react-hook-form'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {alerts} from '@/modules/parking/alerts'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {useGetParkingSessions} from '@/modules/parking/hooks/useGetParkingSessions'
import {useActivateSessionMutation} from '@/modules/parking/service'
import {ParkingSessionStatus} from '@/modules/parking/types'
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
    parkingSessions: activeParkingSessions,
    isLoading: activeParkingSessionsLoading,
  } = useGetParkingSessions(ParkingSessionStatus.active, {
    skip: !currentPermit?.no_endtime,
  })

  const {
    handleSubmit,
    formState: {isSubmitting},
    setError,
  } = useFormContext<FieldValues>()

  const {report_code} = currentPermit

  const onSubmit = useCallback(
    ({licensePlate}: FieldValues) => {
      if (activeParkingSessions?.[0].vehicle_id === licensePlate.vehicle_id) {
        return
      }

      void activateSession({
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
        )
    },
    [
      activateSession,
      report_code,
      activeParkingSessions,
      goBack,
      setAlert,
      setError,
    ],
  )

  return (
    <Button
      disabled={isSubmitting || isLoading || activeParkingSessionsLoading}
      icon={{name: 'parking-start'}}
      isLoading={isLoading}
      label="Activeer kenteken"
      onPress={handleSubmit(onSubmit)}
      testID={`ParkingActivateLicensePlate${currentPermit.permit_type}Button`}
      variant="primary"
    />
  )
}
