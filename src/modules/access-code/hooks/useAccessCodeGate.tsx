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

/**
 * The type `AccessCodeGateConfig` defines configuration options for an access code gate feature in a
 * TypeScript React application.
 */
type AccessCodeGateConfig = {
  /**
   * forgotCodeScreen - The `forgotCodeScreen` property in the `AccessCodeGateConfig` type
   * represents the configuration for the screen that allows users to retrieve or reset their access
   * code. It is of type `StackNavigationRouteConfig`.
   */
  forgotCodeScreen?: StackNavigationRouteConfig<Record<string, unknown>>
  /**
   * isLoginStepsActive - The `isLoginStepsActive` property in the
   * `AccessCodeGateConfig` type is a boolean value that indicates whether the login steps should show.
   * If `isLoginStepsActive` is set to `true`, it means that the login steps are active
   * and should be displayed or processed as part of the access-code flow.
   */
  isLoginStepsActive?: boolean
  /**
   * loginSteps - The `loginSteps` property in the `AccessCodeGateConfig` type represents a
   * stack navigation route configuration for the login steps. It is used to define the routes and
   * screens that are part of the login process into the module, and that incorporates the access-code flow.
   * Each route in the `loginSteps` stack represents a step or screen.
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
