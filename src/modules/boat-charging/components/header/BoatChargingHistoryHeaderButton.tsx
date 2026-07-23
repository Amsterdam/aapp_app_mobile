import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

export const BoatChargingHistoryHeaderButton = () => {
  const navigation = useNavigation<BoatChargingRouteName>()

  return (
    <IconButton
      accessibilityLabel="Naar Laadgeschiedenis"
      icon={
        <Icon
          color="link"
          name="time-back"
          size="lg"
        />
      }
      onPress={() =>
        navigation.navigate(BoatChargingRouteName.boatChargingHistory)
      }
      testID="BoatChargingHistoryHeaderButton"
    />
  )
}
