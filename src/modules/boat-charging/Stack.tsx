import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {NewSessionFormProvider} from '@/modules/boat-charging/providers/NewSessionForm.provider'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {screenConfig} from '@/modules/boat-charging/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const ModuleStack = () => {
  const screenOptions = useScreenOptions()
  const screenOptionsSettings = useScreenOptions({
    screenType: 'settings',
  })

  return (
    <Stack.Navigator
      initialRouteName={BoatChargingRouteName.map}
      layout={NewSessionFormProvider}
      screenOptions={screenOptions}>
      {Object.entries(screenConfig).map(([key, route]) => (
        <Stack.Screen
          key={key}
          {...route}
          options={{
            ...(route.screenType === 'settings' && screenOptionsSettings),
            ...route.options,
          }}
        />
      ))}
    </Stack.Navigator>
  )
}
