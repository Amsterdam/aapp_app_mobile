import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useAccessCodeGate} from '@/modules/access-code/hooks/useAccessCodeGate'
import {useIsLoggedIn} from '@/modules/boat-charging/hooks/useIsLoggedIn'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'
import {screenConfig} from '@/modules/boat-charging/screenConfig'
import {BoatChargingLoginStepsScreen} from '@/modules/boat-charging/screens/BoatChargingLoginSteps.screen'

const Stack = createStackNavigator<RootStackParams>()

export const ModuleStack = () => {
  const screenOptions = useScreenOptions()
  const screenOptionsSettings = useScreenOptions({
    screenType: 'settings',
  })
  const {isLoggedIn} = useIsLoggedIn()

  const accessCodeGate = useAccessCodeGate(Stack, {
    screenOptions,
    loginSteps: {
      [BoatChargingRouteName.loginSteps]: {
        component: BoatChargingLoginStepsScreen,
        name: BoatChargingRouteName.loginSteps,
        options: {
          headerTitle: 'Inloggen',
        },
      },
    },
    additionalGateCondition: isLoggedIn,
  })

  return (
    <Stack.Navigator
      initialRouteName={BoatChargingRouteName.map}
      screenOptions={screenOptions}>
      {accessCodeGate(
        Object.entries(screenConfig).map(([key, route]) => (
          <Stack.Screen
            key={key}
            {...route}
            options={{
              ...(route.screenType === 'settings' && screenOptionsSettings),
              ...route.options,
            }}
          />
        )),
      )}
    </Stack.Navigator>
  )
}
