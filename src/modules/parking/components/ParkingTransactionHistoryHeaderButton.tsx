import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'

export const ParkingTransactionHistoryHeaderButton = () => {
  const navigation = useNavigation<ParkingRouteName>()

  return (
    <IconButton
      accessibilityLabel="Naar Geld toevoegen"
      icon={
        <Icon
          color="link"
          isFilled
          name="plus-circle"
          size="lgx"
          testID="ParkingMoneyHeaderButtonIcon"
        />
      }
      onPress={() => navigation.navigate(ParkingRouteName.increaseBalance)}
      testID="ParkingMoneyHeaderButton"
    />
  )
}
