import {TransitionPresets} from '@react-navigation/stack'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {usePendingScreen} from '@/hooks/navigation/usePendingScreen'
import {useSelector} from '@/hooks/redux/useSelector'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {BiometricsPermissionScreen} from '@/modules/access-code/screens/BiometricsPermission.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'
import {useLoginSteps} from '@/modules/city-pass/hooks/useLoginSteps'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {
  cityPassScreenConfig,
  type CityPassScreenConfigRoutes,
} from '@/modules/city-pass/screenConfig'
import {CityPassForgotAccessCodeScreen} from '@/modules/city-pass/screens/CityPassForgotAccessCode.screen'
import {CityPassIntroScreen} from '@/modules/city-pass/screens/CityPassIntro.screen'
import {LoginStepsScreen} from '@/modules/city-pass/screens/LoginSteps.screen'
import {selectIsCityPassOwnerRegistered} from '@/modules/city-pass/slice'
import {sortEntriesByKeyFirst} from '@/utils/sortEntriesByKeyFirst'

const Stack = createStackNavigator<RootStackParams>()

// eslint-disable-next-line sonarjs/cognitive-complexity
export const CityPassStack = () => {
  const screenOptions = useScreenOptions()
  const isCityPassOwnerRegistered = useSelector(selectIsCityPassOwnerRegistered)
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isLoginStepsActive} = useLoginSteps()
  const {isEnrolled, useBiometrics} = useAccessCodeBiometrics()
  const {pendingScreen} = usePendingScreen<CityPassScreenConfigRoutes>()
  const sortedScreenConfig = sortEntriesByKeyFirst(
    Object.entries(cityPassScreenConfig),
    pendingScreen,
  )

  if (isLoading) {
    return null
  }

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {isForgotCode ? (
        <Stack.Screen
          component={CityPassForgotAccessCodeScreen}
          name={CityPassRouteName.forgotAccessCode}
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
      ) : isCityPassOwnerRegistered ? (
        accessCode && !isLoginStepsActive ? (
          isCodeValid ? (
            sortedScreenConfig.map(([key, route]) => (
              <Stack.Screen
                key={key}
                {...route}
              />
            ))
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
              name={CityPassRouteName.loginSteps}
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
          <Stack.Screen
            component={CityPassIntroScreen}
            name={CityPassRouteName.login}
            options={{headerTitle: 'Stadspas'}}
          />
          <Stack.Screen
            component={CityPassForgotAccessCodeScreen}
            name={CityPassRouteName.forgotAccessCode}
            options={{headerTitle: 'Toegangscode vergeten'}}
          />
          <Stack.Screen
            component={LoginStepsScreen}
            name={CityPassRouteName.loginSteps}
            options={{headerTitle: 'Inloggen'}}
          />
        </>
      )}
    </Stack.Navigator>
  )
}
