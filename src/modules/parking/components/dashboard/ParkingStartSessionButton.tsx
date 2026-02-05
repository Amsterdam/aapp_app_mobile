import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useCurrentParkingPermit} from '@/modules/parking/hooks/useCurrentParkingPermit'
import {ParkingRouteName} from '@/modules/parking/routes'

export const ParkingStartSessionButton = () => {
  const {navigate} = useNavigation()

  const currentPermit = useCurrentParkingPermit()

  return (
    <Button
      icon={{name: 'parking-start'}}
      label={
        currentPermit.no_endtime ? 'Kies ander kenteken' : 'Start parkeersessie'
      }
      onPress={() => {
        navigate(ParkingRouteName.startSession)
      }}
      testID={`ParkingGoToStartSession${currentPermit.permit_type}Button`}
    />
  )
}
