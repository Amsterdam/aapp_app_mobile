import {useCallback} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'
import {ParkingSession} from '@/modules/parking/types'

type Props = {
  parkingSession: ParkingSession
}

export const ParkingSessionDetailsVisitorExtendButton = ({
  parkingSession,
}: Props) => {
  const {navigate} = useNavigation()

  const onPress = useCallback(() => {
    navigate(ParkingRouteName.visitorEditSession, {
      parkingSession,
    })
  }, [navigate, parkingSession])

  return (
    <Button
      label="Langer parkeren"
      onPress={onPress}
      testID="ParkingSessionDetailsVisitorExtendButton"
      variant="secondary"
    />
  )
}
