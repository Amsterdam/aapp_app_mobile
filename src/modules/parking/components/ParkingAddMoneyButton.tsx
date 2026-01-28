import {Button, ButtonProps} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {ParkingRouteName} from '@/modules/parking/routes'

type Props = {
  variant?: ButtonProps['variant']
}

export const ParkingAddMoneyButton = ({variant}: Props) => {
  const {navigate} = useNavigation()

  return (
    <Button
      iconName="euro-coins"
      label="Geld toevoegen"
      onPress={() => {
        navigate(ParkingRouteName.increaseBalance)
      }}
      testID="ParkingPermitBalanceMoneyAddButton"
      variant={variant}
    />
  )
}
