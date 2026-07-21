import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

export const BoatChargingHelpNavigationButton = () => {
  const {navigate} = useNavigation()

  return (
    <NavigationButton
      chevronSize="md"
      emphasis="default"
      horizontallyAlign="start"
      insetHorizontal="no"
      onPress={() => navigate(BoatChargingRouteName.boatChargingHelp)}
      testID="BoatChargingHelpNavigationButton"
      title="Hulp bij laden"
    />
  )
}
