import {
  TransitionPresets,
  type StackNavigationOptions,
} from '@react-navigation/stack'
import type {ReactNode} from 'react'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {
  RootStackParams,
  type HeaderContentOptions,
} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
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

  const loginSteps = {
    [ParkingRouteName.loginSteps]: {
      component: LoginStepsScreen,
      name: ParkingRouteName.loginSteps,
      options: {
        headerTitle: 'Inloggen',
      },
    },
  }

  const {isLoginStepsActive} = useLoginSteps()

  const accessCodeGate = useAccessCodeGate(loginSteps, isLoginStepsActive)

  const {isRecentlyLoggedOut} = useIsRecentlyLoggedOut()

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {hasAccounts ? (
        accessCodeGate(
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
          </Stack.Group>,
        )
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
  )
}

const AccessCodeLoadingScreen = () => (
  <Screen testID="AccessCodeLoadingScreen">
    <Box grow>
      <Column
        align="center"
        flex={1}>
        <PleaseWait testID="AccessCodeLoadingScreenPleaseWait" />
      </Column>
    </Box>
  </Screen>
)

const AccessCodeErrorScreen = () => (
  <Screen testID="AccessCodeLoadingScreen">
    <Box grow>
      <Column
        align="center"
        flex={1}>
        <SomethingWentWrong testID="AccessCodeLoadingScreenSomethingWentWrong" />
      </Column>
    </Box>
  </Screen>
)

const useAccessCodeGate = (
  loginSteps: Record<
    string,
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      component: React.ComponentType<any>
      name: keyof ParkingStackParams
      options?: StackNavigationOptions & HeaderContentOptions
      screenType?: 'default' | 'settings'
      title?: string
    }
  >,
  isLoginStepsActive?: boolean,
) => {
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isEnrolled, useBiometrics} = useAccessCodeBiometrics()

  return (stack: ReactNode): ReactNode => {
    if (useBiometrics === undefined && !!isEnrolled && isCodeValid) {
      return (
        /// TODO: test op echt device
        <Stack.Screen
          component={BiometricsPermissionScreen}
          name={AccessCodeRouteName.biometricsPermission}
          options={{
            headerTitle: 'Sneller toegang',
          }}
        />
      )
    }

    if (isCodeValid) {
      return stack
    }

    if (isLoading) {
      return (
        <Stack.Screen
          component={AccessCodeLoadingScreen}
          name="loading"
          options={{
            ...TransitionPresets.ModalFadeTransition,
          }}
        />
      )
    }

    if (isForgotCode) {
      return (
        <Stack.Screen // TODO: module specific forgot code screen
          component={ParkingForgotAccessCodeScreen}
          name={ParkingRouteName.forgotAccessCode}
          options={{headerTitle: 'Toegangscode vergeten'}}
        />
      )
    }

    if (!accessCode || isLoginStepsActive) {
      return (
        <Stack.Group>
          {!!loginSteps &&
            Object.entries(loginSteps).map(([key, route]) => (
              <Stack.Screen
                key={key}
                {...route}
              />
            ))}
          <Stack.Screen
            component={SetAccessCodeScreen}
            name={AccessCodeRouteName.setAccessCode}
            options={{headerTitle: 'Toegangscode kiezen'}}
          />
          <Stack.Screen
            component={ConfirmAccessCodeScreen}
            name={AccessCodeRouteName.confirmAccessCode}
            options={{headerTitle: 'Toegangscode herhalen'}}
          />
        </Stack.Group>
      )
    }

    if (attemptsLeft > 0) {
      return (
        <Stack.Screen
          component={AccessCodeScreen}
          name={AccessCodeRouteName.accessCode}
          options={{
            headerTitle: 'Toegangscode invoeren',
            ...TransitionPresets.ModalFadeTransition,
          }}
        />
      )
    }

    if (attemptsLeft === 0) {
      return (
        <Stack.Screen
          component={AccessCodeInvalidScreen}
          name={AccessCodeRouteName.accessCodeInvalid}
        />
      )
    }

    return (
      <Stack.Screen
        component={AccessCodeErrorScreen}
        name={'error'}
      />
    )
  }
}
