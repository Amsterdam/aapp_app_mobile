import {type ParamListBase} from '@react-navigation/native'
import {
  TransitionPresets,
  type StackNavigationOptions,
} from '@react-navigation/stack'
import {useCallback, type ReactNode} from 'react'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {
  type RootStackParams,
  type StackNavigationRouteConfig,
  type StackNavigationRoutes,
} from '@/app/navigation/types'
import {AccessCodeGateProxyScreen} from '@/modules/access-code/components/AccessCodeGateProxyScreen'
import {
  AccessCodeGateStateName,
  useAccessCodeGateState,
} from '@/modules/access-code/hooks/useAccessCodeGateState'
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
export const useAccessCodeGate = <Params extends ParamListBase>(
  Stack: ReturnType<typeof createStackNavigator<RootStackParams>>,
  config?: AccessCodeGateConfig,
): {
  /**
   * Use this for module level access code protection
   */
  accessCodeGateRoot: (stack: ReactNode) => ReactNode
  /**
   * Use this for per screen access code protection
   */
  accessCodeGateScreen: (
    protectedScreen: StackNavigationRouteConfig<Params>,
    screenOptions?: StackNavigationOptions,
  ) => ReactNode
} => {
  const {loginSteps, isLoginStepsActive, forgotCodeScreen} = config || {}

  const accessCodeGateStateName = useAccessCodeGateState(
    !!forgotCodeScreen,
    isLoginStepsActive,
  )

  const accessCodeGateRoot = (stack: ReactNode): ReactNode => {
    if (
      accessCodeGateStateName === AccessCodeGateStateName.biometricsPermission
    ) {
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

    if (accessCodeGateStateName === AccessCodeGateStateName.allowed) {
      return stack
    }

    if (accessCodeGateStateName === AccessCodeGateStateName.loading) {
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

    if (
      accessCodeGateStateName === AccessCodeGateStateName.forgotCode &&
      forgotCodeScreen
    ) {
      return <Stack.Screen {...forgotCodeScreen} />
    }

    if (accessCodeGateStateName === AccessCodeGateStateName.setup) {
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

    if (accessCodeGateStateName === AccessCodeGateStateName.accessCode) {
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

    if (accessCodeGateStateName === AccessCodeGateStateName.invalid) {
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

  const accessCodeGateScreen = useCallback(
    (
      protectedScreen: StackNavigationRouteConfig<Params>,
      screenOptions?: StackNavigationOptions,
    ) => (
      <Stack.Screen
        key={String(protectedScreen.name)}
        name={String(protectedScreen.name)}
        options={protectedScreen.options}>
        {props => (
          <AccessCodeGateProxyScreen
            {...props}
            forgotCodeScreen={forgotCodeScreen}
            gateStateName={accessCodeGateStateName}
            loginSteps={loginSteps}
            navigatorScreenOptions={screenOptions}
            ProtectedScreenComponent={protectedScreen.component}
          />
        )}
      </Stack.Screen>
    ),
    [Stack, accessCodeGateStateName, forgotCodeScreen, loginSteps],
  )

  return {
    accessCodeGateRoot,
    accessCodeGateScreen,
  }
}
