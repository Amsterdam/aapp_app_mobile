import {useCallback} from 'react'
import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useBoatChargingSession} from '@/modules/boat-charging/hooks/useBoatChargingSession'
import {useSelectChargingPoint} from '@/modules/boat-charging/hooks/useSelectChargingPoint'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

export const BoatChargingMapNavigationButton = () => {
  const {session} = useBoatChargingSession()
  const {navigate} = useNavigation()
  const selectChargingPoint = useSelectChargingPoint()

  const onPress = useCallback(() => {
    selectChargingPoint(session?.location.id ?? '')
    navigate(BoatChargingRouteName.boatCharging)
  }, [session?.location.id, navigate, selectChargingPoint])

  return (
    <NavigationButton
      chevronSize="md"
      emphasis="default"
      horizontallyAlign="start"
      insetHorizontal="no"
      onPress={onPress}
      testID="BoatChargingMapNavigationButton"
      title="Bekijk op kaart"
    />
  )
}
