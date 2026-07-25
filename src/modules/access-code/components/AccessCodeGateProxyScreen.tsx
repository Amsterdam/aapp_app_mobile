import type {StackScreenElement} from '@/modules/access-code/types'
import type {Route} from '@react-navigation/native'
import type {StackNavigationOptions} from '@react-navigation/stack'
import type {ComponentType} from 'react'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {
  type NavigationProps,
  type RootStackParams,
  type StackNavigationRoutes,
} from '@/app/navigation/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Center} from '@/components/ui/layout/Center'
import {ACCESS_CODE_SCREEN_MAP} from '@/modules/access-code/constants/accessCodeScreenMap'
import {FORGOT_CODE_SCREEN} from '@/modules/access-code/constants/forgotAccessCodeScreenConfig'
import {
  AccessCodeGateStateName,
  type useAccessCodeGateState,
} from '@/modules/access-code/hooks/useAccessCodeGateState'

type AccessCodeGateProxyScreenProps<RouteName extends keyof RootStackParams> = {
  ForgotCodeScreen: ComponentType
  ProtectedScreenComponent:
    | React.ComponentType<{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        navigation: any
        route: Route<Extract<RouteName, string>, RootStackParams[RouteName]>
      }>
    | React.ComponentType
  loginSteps?: StackNavigationRoutes<RootStackParams>
  navigatorScreenOptions?: StackNavigationOptions
  state: ReturnType<typeof useAccessCodeGateState>
} & NavigationProps<RouteName> &
  StackScreenElement<'Screen'>['props']

const AccessCodeGateStack = createStackNavigator<RootStackParams>()

export const AccessCodeGateProxyScreen = <
  RouteName extends keyof RootStackParams,
>({
  ProtectedScreenComponent,
  ForgotCodeScreen,
  state,
  loginSteps,
  navigatorScreenOptions,
  ...props
}: AccessCodeGateProxyScreenProps<RouteName>) => {
  if (state === AccessCodeGateStateName.loading) {
    return (
      <Center grow>
        <PleaseWait testID="AccessCodeGateProxyScreenPleaseWait" />
      </Center>
    )
  }

  if (state === AccessCodeGateStateName.allowed) {
    return <ProtectedScreenComponent {...props} />
  }

  return (
    <AccessCodeGateStack.Navigator
      screenOptions={{...navigatorScreenOptions, headerShown: true}}>
      {state === AccessCodeGateStateName.biometricsPermission && (
        <AccessCodeGateStack.Screen
          {...ACCESS_CODE_SCREEN_MAP.biometricsPermission}
        />
      )}

      {state === AccessCodeGateStateName.forgotCode && (
        <AccessCodeGateStack.Screen
          {...FORGOT_CODE_SCREEN}
          component={ForgotCodeScreen}
        />
      )}

      {state === AccessCodeGateStateName.invalid && (
        <AccessCodeGateStack.Screen {...ACCESS_CODE_SCREEN_MAP.invalid} />
      )}

      {state === AccessCodeGateStateName.accessCode && (
        <AccessCodeGateStack.Screen {...ACCESS_CODE_SCREEN_MAP.accessCode} />
      )}

      {state === AccessCodeGateStateName.setup && (
        <AccessCodeGateStack.Group screenOptions={navigatorScreenOptions}>
          {!!loginSteps &&
            Object.entries(loginSteps).map(([key, route]) => (
              <AccessCodeGateStack.Screen
                key={key}
                {...route}
              />
            ))}

          <AccessCodeGateStack.Screen {...ACCESS_CODE_SCREEN_MAP.setup} />
          <AccessCodeGateStack.Screen {...ACCESS_CODE_SCREEN_MAP.confirm} />
        </AccessCodeGateStack.Group>
      )}
    </AccessCodeGateStack.Navigator>
  )
}
