import {
  TransitionPresets,
  type StackNavigationOptions,
} from '@react-navigation/stack'
import {useMemo, type ReactNode} from 'react'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {
  RootStackParams,
  type HeaderContentOptions,
} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {usePendingScreen} from '@/hooks/navigation/usePendingScreen'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {BiometricsPermissionScreen} from '@/modules/access-code/screens/BiometricsPermission.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'
import {useIsRecentlyLoggedOut} from '@/modules/parking/hooks/useIsRecentlyLoggedOut'
import {useLoginSteps} from '@/modules/parking/hooks/useLoginSteps'
import {
  ParkingRouteName,
  type ParkingStackParams,
} from '@/modules/parking/routes'
import {
  parkingScreenConfig,
  type ParkingScreenConfigRoutes,
} from '@/modules/parking/screenConfig'
import {LoginStepsScreen} from '@/modules/parking/screens/LoginSteps.screen'
import {ParkingForgotAccessCodeScreen} from '@/modules/parking/screens/ParkingForgotAccessCode.screen'
import {ParkingIntroScreen} from '@/modules/parking/screens/ParkingIntro.screen'
import {ParkingLoginScreen} from '@/modules/parking/screens/ParkingLogin.screen'
import {useParkingAccountIsLoggingIn} from '@/modules/parking/slice'
import {useIsLoggedIn} from '@/modules/parking/useIsLoggedIn'
import {sortEntriesByKeyFirst} from '@/utils/sortEntriesByKeyFirst'

const Stack = createStackNavigator<RootStackParams>()

export const ParkingStack = () => {
  const screenOptions = useScreenOptions()
  const isLoggingIn = useParkingAccountIsLoggingIn()
  const hasAccounts = useIsLoggedIn()
  const {pendingScreen} = usePendingScreen<ParkingScreenConfigRoutes>()
  const sortedScreenConfig = sortEntriesByKeyFirst(
    Object.entries(parkingScreenConfig),
    pendingScreen,
  )
  const {isLoginStepsActive} = useLoginSteps()

  const {isRecentlyLoggedOut} = useIsRecentlyLoggedOut()

  return (
    <AccessCodeWrapper
      hide={!hasAccounts}
      isLoginStepsActive={isLoginStepsActive}
      loginSteps={{
        [ParkingRouteName.loginSteps]: {
          component: LoginStepsScreen,
          name: ParkingRouteName.loginSteps,
          options: {
            headerTitle: 'Inloggen',
          },
        },
      }}>
      <Stack.Navigator screenOptions={screenOptions}>
        {hasAccounts ? (
          <Stack.Group>
            {/*Logged in */}
            {!!isLoggingIn && (
              <Stack.Screen
                component={ParkingLoginScreen}
                name={ParkingRouteName.login}
                options={{headerTitle: 'Inloggen'}}
              />
            )}
            {sortedScreenConfig.map(([key, parkingRoute]) => (
              <Stack.Screen
                key={key}
                {...parkingRoute}
              />
            ))}
          </Stack.Group>
        ) : (
          <Stack.Group>
            {/*Logged out */}
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
    </AccessCodeWrapper>
  )
}

const AccessCodeStack = createStackNavigator<RootStackParams>()

const AccessCodeWrapper = ({
  children,
  hide,
  isLoginStepsActive,
  loginSteps,
}: {
  children: ReactNode
  hide?: boolean
  isLoginStepsActive?: boolean
  loginSteps?: Record<
    string,
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component: React.ComponentType<any>
      name: keyof ParkingStackParams
      options?: StackNavigationOptions & HeaderContentOptions
      screenType?: 'default' | 'settings'
      title?: string
    }
  >
}) => {
  const screenOptions = useScreenOptions()

  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isEnrolled, useBiometrics} = useAccessCodeBiometrics()

  const accessCodeStackSwitch = useMemo(() => {
    if (isForgotCode) {
      return (
        <AccessCodeStack.Screen
          component={ParkingForgotAccessCodeScreen}
          name={ParkingRouteName.forgotAccessCode}
          options={{headerTitle: 'Toegangscode vergeten'}}
        />
      )
    }

    if (!accessCode || isLoginStepsActive) {
      return (
        <AccessCodeStack.Group>
          {!!loginSteps &&
            Object.entries(loginSteps).map(([key, parkingRoute]) => (
              <AccessCodeStack.Screen
                key={key}
                {...parkingRoute}
              />
            ))}
          <AccessCodeStack.Screen
            component={SetAccessCodeScreen}
            name={AccessCodeRouteName.setAccessCode}
            options={{headerTitle: 'Toegangscode kiezen'}}
          />
          <AccessCodeStack.Screen
            component={ConfirmAccessCodeScreen}
            name={AccessCodeRouteName.confirmAccessCode}
            options={{headerTitle: 'Toegangscode herhalen'}}
          />
        </AccessCodeStack.Group>
      )
    }

    if (attemptsLeft > 0) {
      return (
        <AccessCodeStack.Screen
          component={AccessCodeScreen}
          name={AccessCodeRouteName.accessCode}
          options={{
            headerTitle: 'Toegangscode invoeren',
            ...TransitionPresets.ModalFadeTransition,
          }}
        />
      )
    }

    return (
      <AccessCodeStack.Screen
        component={AccessCodeInvalidScreen}
        name={AccessCodeRouteName.accessCodeInvalid}
      />
    )
  }, [isForgotCode, accessCode, attemptsLeft, loginSteps, isLoginStepsActive])

  if (isLoading) {
    return null
  }

  if (hide || isCodeValid) {
    return children
  }

  return (
    <AccessCodeStack.Navigator screenOptions={screenOptions}>
      {accessCodeStackSwitch}

      {useBiometrics === undefined && !!isEnrolled && !!isCodeValid && (
        <AccessCodeStack.Screen
          component={BiometricsPermissionScreen}
          name={AccessCodeRouteName.biometricsPermission}
          options={{
            headerTitle: 'Sneller toegang',
          }}
        />
      )}
    </AccessCodeStack.Navigator>
  )
}
