import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {usePendingScreen} from '@/hooks/navigation/usePendingScreen'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useAccessCodeGate} from '@/modules/access-code/hooks/useAccessCodeGate'
import {useIsRecentlyLoggedOut} from '@/modules/parking/hooks/useIsRecentlyLoggedOut'
import {useLoginSteps} from '@/modules/parking/hooks/useLoginSteps'
import {ParkingRouteName} from '@/modules/parking/routes'
import {
  parkingScreenConfig,
  type ParkingScreenConfigRoutes,
} from '@/modules/parking/screenConfig'
import {LoginStepsScreen} from '@/modules/parking/screens/LoginSteps.screen'
import {ParkingForgotAccessCodeScreen} from '@/modules/parking/screens/ParkingForgotAccessCode.screen'
import {ParkingIntroScreen} from '@/modules/parking/screens/ParkingIntro.screen'
import {ParkingLoginScreen} from '@/modules/parking/screens/ParkingLogin.screen'
import {
  setIsLoggingIn,
  useParkingAccountIsLoggingIn,
  useParkingAccountIsLoggingOut,
} from '@/modules/parking/slice'
import {useIsLoggedIn} from '@/modules/parking/useIsLoggedIn'
import {sortEntriesByKeyFirst} from '@/utils/sortEntriesByKeyFirst'

const Stack = createStackNavigator<RootStackParams>()

export const ParkingStack = () => {
  const dispatch = useDispatch()
  const screenOptions = useScreenOptions()
  const screenOptionsSettings = useScreenOptions({
    screenType: 'settings',
  })
  const isLoggingIn = useParkingAccountIsLoggingIn()
  const isLoggingOut = useParkingAccountIsLoggingOut()
  const {isLoggedIn} = useIsLoggedIn()
  const {pendingScreen} = usePendingScreen<ParkingScreenConfigRoutes>()
  const screenConfigPendingFirst = sortEntriesByKeyFirst(
    Object.entries(parkingScreenConfig),
    pendingScreen,
  )

  const {isRecentlyLoggedOut} = useIsRecentlyLoggedOut()
  const {isLoginStepsActive} = useLoginSteps()

  const accessCodeGate = useAccessCodeGate(Stack, {
    loginSteps: {
      [ParkingRouteName.loginSteps]: {
        component: LoginStepsScreen,
        name: ParkingRouteName.loginSteps,
        options: {
          headerTitle: 'Inloggen',
        },
      },
    },
    isLoginStepsActive,
    forgotCodeScreen: {
      component: ParkingForgotAccessCodeScreen,
      name: ParkingRouteName.forgotAccessCode,
      options: {headerTitle: 'Toegangscode vergeten'},
    },
  })

  useBlurEffect(() => {
    dispatch(setIsLoggingIn(false))
  })

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isLoggedIn || isLoggingOut ? (
        accessCodeGate(
          <Stack.Group>
            {!!isLoggingIn && (
              <Stack.Screen
                component={ParkingLoginScreen}
                name={ParkingRouteName.login}
                options={{headerTitle: 'Inloggen'}}
              />
            )}
            {screenConfigPendingFirst.map(([key, parkingRoute]) => (
              <Stack.Screen
                key={key}
                {...parkingRoute}
                options={{
                  ...parkingRoute.options,
                  ...(parkingRoute.screenType === 'settings' &&
                    screenOptionsSettings),
                }}
              />
            ))}
          </Stack.Group>,
        )
      ) : (
        <Stack.Group>
          {!isRecentlyLoggedOut && (
            <Stack.Screen
              component={ParkingIntroScreen}
              name={ParkingRouteName.intro}
              options={{headerTitle: 'Aanmelden parkeren'}}
            />
          )}
          <Stack.Screen
            component={ParkingLoginScreen}
            name={ParkingRouteName.login}
            options={{headerTitle: 'Inloggen'}}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}
