import {TransitionPresets} from '@react-navigation/stack'
import type {ReactNode} from 'react'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {
  type RootStackParams,
  type StackNavigationRouteConfig,
  type StackNavigationRoutes,
} from '@/app/navigation/types'
import {useAccessCodeBiometrics} from '@/modules/access-code/hooks/useAccessCodeBiometrics'
import {useEnterAccessCode} from '@/modules/access-code/hooks/useEnterAccessCode'
import {useGetSecureAccessCode} from '@/modules/access-code/hooks/useGetSecureAccessCode'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {BiometricsPermissionScreen} from '@/modules/access-code/screens/BiometricsPermission.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'

enum AccessCodeGateRouteName {
  fallback = 'AccessCodeGateFallback',
  loading = 'AccessCodeGateLoading',
}

type AccessCodeGateConfig = {
  /**
   * forgotCodeScreen - The module specific configuration for the screen that allows users to reset their access code.
   */
  forgotCodeScreen?: StackNavigationRouteConfig<Record<string, unknown>>
  /**
   * isLoginStepsActive - Indicates whether the login steps should show.
   */
  isLoginStepsActive?: boolean
  /**
   * loginSteps - Defines the routes and screens that are part of the login process into the module, as part of the access-code flow.
   */
  loginSteps?: StackNavigationRoutes<Record<string, unknown>>
}

/**
 * `useAccessCodeGate` is responsible for managing access-code gate-keeping and providing the access-code flow
 * within module navigation Stacks. It internally determines the state of the access code flow.
 * @param Stack The `Stack` navigation object to add access-code Screens and Groups to if the gate returns access-code flow.
 * @param config An optional configuration object of type `AccessCodeGateConfig`
 */
export const useAccessCodeGate = (
  Stack: ReturnType<typeof createStackNavigator<RootStackParams>>,
  config?: AccessCodeGateConfig,
) => {
  const {accessCode, isLoading} = useGetSecureAccessCode()
  const {attemptsLeft, isCodeValid, isForgotCode} = useEnterAccessCode()
  const {isEnrolled, useBiometrics} = useAccessCodeBiometrics()

  const {loginSteps, isLoginStepsActive, forgotCodeScreen} = config || {}

  return (stack: ReactNode): ReactNode => {
    if (useBiometrics === undefined && isEnrolled && isCodeValid) {
      return (
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
          name={AccessCodeGateRouteName.loading}
          options={{
            ...TransitionPresets.ModalFadeTransition,
          }}>
          {() => null}
        </Stack.Screen>
      )
    }

    if (isForgotCode && forgotCodeScreen) {
      return <Stack.Screen {...forgotCodeScreen} />
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
        name={AccessCodeGateRouteName.fallback}
        options={{
          ...TransitionPresets.ModalFadeTransition,
        }}>
        {() => null}
      </Stack.Screen>
    )
  }
}
