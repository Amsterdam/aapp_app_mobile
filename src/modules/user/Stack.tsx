import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {UserRouteName} from '@/modules/user/routes'
import {screenConfig} from '@/modules/user/screenConfig'
import {capitalizeString} from '@/utils/transform/capitalizeString'

const Stack = createStackNavigator<RootStackParams>()

export const UserStack = () => {
  const screenOptions = useScreenOptions()
  const screenOptionsSettings = useScreenOptions({
    screenType: 'settings',
  })
  const {biometricsLabel} = useAccessCodeBiometrics()

  return (
    <Stack.Navigator
      initialRouteName={UserRouteName.user}
      screenOptions={screenOptionsSettings}>
      {Object.entries(screenConfig).map(([key, route]) => {
        const headerTitle =
          route.name === UserRouteName.userBiometrics && biometricsLabel
            ? capitalizeString(biometricsLabel)
            : route.options?.headerTitle

        return (
          <Stack.Screen
            key={key}
            {...route}
            options={{
              ...(route.screenType === 'default' && screenOptions),
              ...route.options,
              headerTitle,
            }}
          />
        )
      })}
    </Stack.Navigator>
  )
}
