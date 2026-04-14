import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {KingsdayRouteName} from '@/modules/kingsday/routes'
import {screenConfig} from '@/modules/kingsday/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const KingsdayStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={KingsdayRouteName.overview}
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
