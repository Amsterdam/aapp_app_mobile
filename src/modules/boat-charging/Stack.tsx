import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {screenConfig} from '@/modules/boat-charging/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const BoatChargingStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={BoatChargingRouteName.boatCharging}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
        />
      ))}
    </Stack.Navigator>
  )
}
