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
      icon={{isFilled: true, name: 'city-pass'}}
      label="Stadspas tonen"
      onPress={() => {
        navigate(CityPassRouteName.cityPasses, {index})
      }}
      testID="CityPassShowPassesButton"
    />
  )
}
