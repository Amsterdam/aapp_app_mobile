import {TransitionPresets} from '@react-navigation/stack'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
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
  useParkingAccountIsLoggingIn,
  useParkingAccounts,
} from '@/modules/parking/slice'
import {sortEntriesByKeyFirst} from '@/utils/sortEntriesByKeyFirst'

const Stack = createStackNavigator<RootStackParams>()

// eslint-disable-next-line sonarjs/cognitive-complexity
export const ParkingStack = () => {
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isEnrolled, useBiometrics} = useAccessCodeBiometrics()
  const {isLoginStepsActive} = useLoginSteps()
  const {isRecentlyLoggedOut} = useIsRecentlyLoggedOut()
  const screenOptions = useScreenOptions()
  const accounts = useParkingAccounts()
  const isLoggingIn = useParkingAccountIsLoggingIn()
  const hasAccounts = Object.keys(accounts).length
  const {pendingScreen} = usePendingScreen<ParkingScreenConfigRoutes>()
  const sortedScreenConfig = sortEntriesByKeyFirst(
    Object.entries(parkingScreenConfig),
    pendingScreen,
  )

  if (isLoading) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isForgotCode ? (
        <Stack.Screen
          component={ParkingForgotAccessCodeScreen}
          name={ParkingRouteName.forgotAccessCode}
          options={{headerTitle: 'Toegangscode vergeten'}}
        />
      ) : useBiometrics === undefined && isEnrolled && isCodeValid ? (
        <Stack.Screen
          component={BiometricsPermissionScreen}
          name={AccessCodeRouteName.biometricsPermission}
          options={{
            headerTitle: 'Sneller toegang',
          }}
        />
      ) : hasAccounts ? (
        accessCode && !isLoginStepsActive ? (
          isCodeValid ? (
            <>
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
            </>
          ) : attemptsLeft > 0 ? (
            <Stack.Screen
              component={AccessCodeScreen}
              name={AccessCodeRouteName.accessCode}
              options={{
                headerTitle: 'Toegangscode invoeren',
                ...TransitionPresets.ModalFadeTransition,
              }}
            />
          ) : (
            <Stack.Screen
              component={AccessCodeInvalidScreen}
              name={AccessCodeRouteName.accessCodeInvalid}
            />
          )
        ) : (
          <>
            <Stack.Screen
              component={LoginStepsScreen}
              name={ParkingRouteName.loginSteps}
              options={{headerTitle: 'Inloggen'}}
            />
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
          </>
        )
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  )
}
