import {type ComponentType} from 'react'
import type {StackNavigationOptions} from '@react-navigation/stack'
import {createStackNavigator} from '@/app/navigation/createStackNavigator'
import {
  type NavigationProps,
  type RootStackParams,
  type StackNavigationRouteConfig,
  type StackNavigationRoutes,
} from '@/app/navigation/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Center} from '@/components/ui/layout/Center'
import {
  AccessCodeGateStateName,
  type useAccessCodeGateState,
} from '@/modules/access-code/hooks/useAccessCodeGateState'
import {AccessCodeRouteName} from '@/modules/access-code/routes'
import {AccessCodeScreen} from '@/modules/access-code/screens/AccessCode.screen'
import {AccessCodeInvalidScreen} from '@/modules/access-code/screens/AccessCodeInvalid.screen'
import {BiometricsPermissionScreen} from '@/modules/access-code/screens/BiometricsPermission.screen'
import {ConfirmAccessCodeScreen} from '@/modules/access-code/screens/ConfirmAccessCode.screen'
import {SetAccessCodeScreen} from '@/modules/access-code/screens/SetAccessCode.screen'

type AccessCodeGateProxyScreenProps<RouteName extends keyof RootStackParams> = {
  ProtectedScreenComponent: ComponentType<object>
  forgotCodeScreen?: StackNavigationRouteConfig<Record<string, unknown>>
  gateStateName: ReturnType<typeof useAccessCodeGateState>
  loginSteps?: StackNavigationRoutes<Record<string, unknown>>
  navigatorScreenOptions?: StackNavigationOptions
} & NavigationProps<RouteName>

const AccessCodeGateStack = createStackNavigator<Record<string, undefined>>()

export const AccessCodeGateProxyScreen = <
  RouteName extends keyof RootStackParams,
>({
  ProtectedScreenComponent,
  forgotCodeScreen,
  gateStateName,
  loginSteps,
  navigatorScreenOptions,
  ...props
}: AccessCodeGateProxyScreenProps<RouteName>) => {
  if (gateStateName === AccessCodeGateStateName.loading) {
    return (
      <Center grow>
        <PleaseWait testID="AccessCodeGateProxyScreenPleaseWait" />
      </Center>
    )
  }

  if (gateStateName === AccessCodeGateStateName.allowed) {
    return <ProtectedScreenComponent {...props} />
  }

  if (gateStateName === AccessCodeGateStateName.biometricsPermission) {
    return <BiometricsPermissionScreen />
  }

  if (
    gateStateName === AccessCodeGateStateName.forgotCode &&
    forgotCodeScreen?.component
  ) {
    const ForgotCodeScreenComponent = forgotCodeScreen?.component

    return ForgotCodeScreenComponent ? <ForgotCodeScreenComponent /> : null
  }

  if (gateStateName === AccessCodeGateStateName.invalid) {
    return <AccessCodeInvalidScreen />
  }

  if (gateStateName === AccessCodeGateStateName.accessCode) {
    return (
      <AccessCodeScreen
        {...(props as NavigationProps<AccessCodeRouteName.accessCode>)}
      />
    )
  }

  if (gateStateName === AccessCodeGateStateName.setup) {
    return (
      <AccessCodeGateStack.Navigator screenOptions={navigatorScreenOptions}>
        {!!loginSteps &&
          Object.entries(loginSteps).map(([key, route]) => (
            <AccessCodeGateStack.Screen
              component={route.component}
              key={key}
              name={String(route.name)}
            />
          ))}
        <AccessCodeGateStack.Screen
          component={SetAccessCodeScreen}
          name={AccessCodeRouteName.setAccessCode}
        />
        <AccessCodeGateStack.Screen
          component={ConfirmAccessCodeScreen}
          name={AccessCodeRouteName.confirmAccessCode}
        />
      </AccessCodeGateStack.Navigator>
    )
  }

  return null
}
