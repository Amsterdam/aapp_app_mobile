import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {AddressRouteName} from '@/modules/address/routes'
import {screenConfig} from '@/modules/address/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const ModuleStack = () => {
  const screenOptions = useScreenOptions()
  const screenOptionsSettings = useScreenOptions({
    screenType: 'settings',
  })

  return (
    <Stack.Navigator
      initialRouteName={AddressRouteName.address}
      screenOptions={screenOptionsSettings}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
          options={{
            ...(route.screenType === 'default' && screenOptions),
            ...route.options,
          }}
        />
      ))}
    </Stack.Navigator>
  )
}
