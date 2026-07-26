import {useCallback, useMemo, type ReactNode} from 'react'
import type {StackElement, StackFactory} from '@/modules/access-code/types'
import type {StackNavigationOptions} from '@react-navigation/stack'
import {
  type StackNavigationRouteConfig,
  type StackNavigationRoutes,
} from '@/app/navigation/types'
import {AccessCodeGateProxyScreen} from '@/modules/access-code/components/AccessCodeGateProxyScreen'
import {ACCESS_CODE_SCREEN_MAP} from '@/modules/access-code/constants/accessCodeScreenMap'
import {FORGOT_CODE_SCREEN} from '@/modules/access-code/constants/forgotAccessCodeScreenConfig'
import {
  AccessCodeGateStateName,
  useAccessCodeGateState,
} from '@/modules/access-code/hooks/useAccessCodeGateState'

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
  screenOptions?: StackNavigationOptions
}

type AccessCodeGateFunction = {
  (stack: StackElement<'Group'>): ReactNode
  (stackMap: Array<StackElement<'Screen'>>): ReactNode
}

/**
 * `useAccessCodeGate` is responsible for managing access-code gate-keeping and providing the access-code flow
 * within module navigation Stacks. It internally determines the accessCodeGateStateName of the access code flow.
 * Wrap the callback around the mapping of screenConfig inside the module/stack.ts, and pass `accessCodeGate: true` to the screenConfig.
 * @param Stack The `Stack` navigation object to add access-code Screens and Groups to if the gate returns access-code flow.
 * @param config An optional configuration object of type `AccessCodeGateConfig`
 * @example
 * ```tsx
 * const Stack = createStackNavigator<RootStackParams>()
 *
 * export const ModuleStack = () => {
 *   const screenOptions = useScreenOptions()
 *   const accessCodeGate = useAccessCodeGate(Stack, {screenOptions})
 *
 *   return (
 *     <Stack.Navigator screenOptions={screenOptions}>
 *       {accessCodeGate(
 *         Object.entries(screenConfig).map(([key, route]) => (
 *           <Stack.Screen
 *             key={key}
 *             {...route}
 *           />
 *         )),
 *       )}
 *     </Stack.Navigator>
 *   )
 * }
 * ```
 *
 * And in the `screenConfig.ts`:
 * ```tsx
 * [NewsRouteName.article]: {
 *  component: NewsArticleScreen,
 *  name: NewsRouteName.article,
 *  options: {
 *    headerShown: false,
 *    headerTitle: 'Nieuws',
 *    accessCodeGate: true,
 *  },
 * }
 * ```
 */
export const useAccessCodeGate = (
  Stack: StackFactory,
  config?: AccessCodeGateConfig,
): AccessCodeGateFunction => {
  const {loginSteps, isLoginStepsActive} = config || {}

  const accessCodeGateStateName = useAccessCodeGateState(isLoginStepsActive)

  const forgotCodeScreen = useMemo(
    () => config?.forgotCodeScreen ?? FORGOT_CODE_SCREEN,
    [config],
  )

  const addAccessGateProxyToStackScreens = useCallback(
    (stack: Array<StackElement<'Screen'>>) =>
      stack.map(entry => {
        if (entry.props.options?.accessCodeGate) {
          return (
            <Stack.Screen
              key={entry.props.name}
              name={entry.props.name}
              options={{
                ...entry.props.options,
                headerShown:
                  entry.props.options.headerShown !== false &&
                  accessCodeGateStateName === AccessCodeGateStateName.allowed,
              }}>
              {stackProps =>
                !!entry.props.component && (
                  <AccessCodeGateProxyScreen
                    {...stackProps}
                    {...config}
                    {...entry.props}
                    ForgotCodeScreen={forgotCodeScreen.component}
                    navigatorScreenOptions={config?.screenOptions}
                    ProtectedScreenComponent={entry.props.component}
                    state={accessCodeGateStateName}
                  />
                )
              }
            </Stack.Screen>
          )
        } else {
          return entry
        }
      }),
    [Stack, accessCodeGateStateName, config, forgotCodeScreen],
  )

  const handleConditionalScreenGateKeeping = useCallback(
    (stack: StackElement<'Group'>) => {
      if (accessCodeGateStateName === AccessCodeGateStateName.allowed) {
        return stack
      }

      if (accessCodeGateStateName === AccessCodeGateStateName.forgotCode) {
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
              {...ACCESS_CODE_SCREEN_MAP[AccessCodeGateStateName.setup]}
            />
            <Stack.Screen
              {...ACCESS_CODE_SCREEN_MAP[AccessCodeGateStateName.confirm]}
            />
          </Stack.Group>
        )
      }

      return (
        <Stack.Screen {...ACCESS_CODE_SCREEN_MAP[accessCodeGateStateName]} />
      )
    },
    [Stack, accessCodeGateStateName, forgotCodeScreen, loginSteps],
  )

  return useCallback<AccessCodeGateFunction>(
    (stack: StackElement<'Group'> | Array<StackElement<'Screen'>>) => {
      if (Array.isArray(stack)) {
        return addAccessGateProxyToStackScreens(stack)
      } else {
        return handleConditionalScreenGateKeeping(stack)
      }
    },
    [addAccessGateProxyToStackScreens, handleConditionalScreenGateKeeping],
  )
}
