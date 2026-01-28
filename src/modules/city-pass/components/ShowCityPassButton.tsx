import {Button} from '@/components/ui/buttons/Button'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {CityPassRouteName} from '@/modules/city-pass/routes'

type Props = {
  index?: number
}

export const ShowCityPassButton = ({index}: Props) => {
  const {navigate} = useNavigation()

  return (
    <Button
      iconName="city-pass_filled"
      label="Stadspas tonen"
      onPress={() => {
        navigate(CityPassRouteName.cityPasses, {index})
      }}
      testID="CityPassShowPassesButton"
    />
  )
}
