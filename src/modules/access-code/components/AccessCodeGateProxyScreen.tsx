import Animated, {FadeIn} from 'react-native-reanimated'
import type {StackElement} from '@/modules/access-code/types'
import type {Route} from '@react-navigation/native'
import type {StackNavigationOptions} from '@react-navigation/stack'
import type {ComponentType} from 'react'
import type {ViewProps} from 'react-native'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {
  type NavigationProps,
  type RootStackParams,
  type StackNavigationRoutes,
} from '@/app/navigation/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Center} from '@/components/ui/layout/Center'
import {ACCESS_CODE_SCREEN_MAP} from '@/modules/access-code/constants/accessCodeScreenMap'
import {FORGOT_CODE_SCREEN} from '@/modules/access-code/constants/forgotAccessCodeScreenConfig'
import {
  AccessCodeGateStateName,
  useAccessCodeGateState,
} from '@/modules/access-code/hooks/useAccessCodeGateState'
import {layoutStyles} from '@/styles/layoutStyles'

type AccessCodeGateProxyScreenProps<RouteName extends keyof RootStackParams> = {
  ForgotCodeScreen: ComponentType
  ProtectedScreenComponent:
    | ComponentType<{
        navigation: unknown
        route: Route<Extract<RouteName, string>, RootStackParams[RouteName]>
      }>
    | ComponentType
  loginSteps?: StackNavigationRoutes<RootStackParams>
  screenOptions?: StackNavigationOptions
  state: ReturnType<typeof useAccessCodeGateState>
} & NavigationProps<RouteName> &
  StackElement<'Screen'>['props']

const AccessCodeGateStack = createStackNavigator<RootStackParams>()

const AnimatedView = (layoutProps: ViewProps) => (
  <Animated.View
    entering={FadeIn}
    style={layoutStyles.grow}
    {...layoutProps}
  />
)

export const AccessCodeGateProxyScreen = <
  RouteName extends keyof RootStackParams,
>({
  ProtectedScreenComponent,
  ForgotCodeScreen,
  state,
  loginSteps,
  screenOptions,
  ...props
}: AccessCodeGateProxyScreenProps<RouteName>) => {
  if (state === AccessCodeGateStateName.loading) {
    return (
      <Center grow>
        <PleaseWait testID="AccessCodeGateProxyScreenPleaseWait" />
      </Center>
    )
  }

  if (state === AccessCodeGateStateName.fallback) {
    return (
      <Center grow>
        <SomethingWentWrong testID="AccessCodeGateProxyScreenSomethingWentWrong" />
      </Center>
    )
  }

  if (state === AccessCodeGateStateName.allowed) {
    return (
      <AnimatedView>
        <ProtectedScreenComponent {...props} />
      </AnimatedView>
    )
  }

  return (
    <AccessCodeGateStack.Navigator
      layout={AnimatedView}
      screenOptions={{...screenOptions, headerShown: true}}>
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
        <AccessCodeGateStack.Group screenOptions={screenOptions}>
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
