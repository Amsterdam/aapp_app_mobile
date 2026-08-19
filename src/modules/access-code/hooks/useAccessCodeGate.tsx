import {TransitionPresets} from '@react-navigation/stack'
import {useCallback, type ReactNode} from 'react'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {
  type RootStackParams,
  type StackNavigationRouteConfig,
  type StackNavigationRoutes,
} from '@/app/navigation/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Center} from '@/components/ui/layout/Center'
import {
  AccessCodeGateStateName,
  useAccessCodeGateState,
} from '@/modules/access-code/hooks/useAccessCodeGateState'
import {AccessCodeGateProvider} from '@/modules/access-code/providers/AccessCodeGate.provider'
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
   * loginSteps - Defines the routes and screens that are part of the login process into the module, as part of the access-code flow.
   */
  loginSteps?: StackNavigationRoutes<Record<string, unknown>>
  /**
   * shouldRenderGate - Whether the access code gate should be rendered.
   * @example ```shouldRenderGate: isLoggedIn === true```
   * @default true
   */
  shouldRenderGate?: boolean
}

/**
 * `useAccessCodeGate` is responsible for managing access-code gate-keeping and providing the access-code flow
 * within module navigation Stacks. It internally determines the state of the access code flow.
 * @param Stack The `Stack` navigation object to add access-code Screens and Groups to if the gate returns access-code flow.
 * @param config An optional configuration object of type `AccessCodeGateConfig`
 */
export const useAccessCodeGate = (
  Stack: ReturnType<typeof createStackNavigator<RootStackParams>>,
  module: ModuleSlug,
  {
    loginSteps,
    forgotCodeScreen,
    shouldRenderGate = true,
  }: AccessCodeGateConfig = {},
) => {
  const state = useAccessCodeGateState(module)

  const renderFlow = useCallback(
    (stack: ReactNode) => {
      switch (state) {
        case AccessCodeGateStateName.biometricsPermission:
          return (
            <Stack.Screen
              component={BiometricsPermissionScreen}
              name={AccessCodeRouteName.biometricsPermission}
              options={{
                headerTitle: 'Sneller toegang',
              }}
            />
          )

        case AccessCodeGateStateName.allowed:
          return stack

        case AccessCodeGateStateName.invalid:
          return (
            <Stack.Screen
              component={AccessCodeInvalidScreen}
              name={AccessCodeRouteName.accessCodeInvalid}
            />
          )

        case AccessCodeGateStateName.forgotCode:
          if (forgotCodeScreen) {
            return <Stack.Screen {...forgotCodeScreen} />
          } else {
            return null
          }

        case AccessCodeGateStateName.setup:
          return (
            <>
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
            </>
          )

        case AccessCodeGateStateName.accessCode:
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

        case AccessCodeGateStateName.fallback:
        case AccessCodeGateStateName.loading:
        default:
          return (
            <Stack.Screen
              name={AccessCodeGateRouteName.loading}
              options={{
                ...TransitionPresets.ModalFadeTransition,
              }}>
              {() => (
                <Center>
                  <PleaseWait
                    showFeedback
                    testID="AccessCodeGatePleaseWait"
                  />
                </Center>
              )}
            </Stack.Screen>
          )
      }
    },
    [state, Stack, loginSteps, forgotCodeScreen],
  )

  return useCallback(
    (stack: ReactNode): ReactNode => (
      <Stack.Group
        screenLayout={props => (
          <AccessCodeGateProvider
            {...props}
            hasForgotCodeScreen={!!forgotCodeScreen}
          />
        )}>
        {!shouldRenderGate ? stack : renderFlow(stack)}
      </Stack.Group>
    ),
    [Stack, renderFlow, shouldRenderGate, forgotCodeScreen],
  )
}
