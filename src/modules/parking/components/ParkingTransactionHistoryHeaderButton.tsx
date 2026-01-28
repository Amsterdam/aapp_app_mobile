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
          name="plus-circle"
          size="xl"
          testID="ParkingMoneyHeaderButtonIcon"
        />
      }
      onPress={() => navigation.navigate(ParkingRouteName.increaseBalance)}
      testID="ParkingMoneyHeaderButton"
    />
  )
}
