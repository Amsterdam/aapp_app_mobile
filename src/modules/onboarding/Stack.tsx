import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {OnboardingRouteName} from '@/modules/onboarding/routes'
import {screenConfig} from '@/modules/onboarding/screenConfig'

const Stack = createStackNavigator<RootStackParams>()

export const ModuleStack = () => {
  const screenOptions = useScreenOptions()

  return (
    <Stack.Navigator
      initialRouteName={OnboardingRouteName.onboarding}
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
