import {ParamListBase} from '@react-navigation/native'
// eslint-disable-next-line no-restricted-imports
import {createStackNavigator as createStackNavigatorOriginal} from '@react-navigation/stack'
import type {ComponentProps} from 'react'
import {createDefaultScreenRouter} from '@/app/navigation/createDefaultScreenRouter'
import {useIsReduceMotionEnabled} from '@/hooks/accessibility/useIsReduceMotionEnabled'

export const createStackNavigator = <T extends ParamListBase>() => {
  const {Navigator, ...rest} = createStackNavigatorOriginal<T>()

  type NavigatorProps = ComponentProps<typeof Navigator> & {
    /**
     * Use this prop when adding a pending screen to the stack.
     * If, for example, a pending screen is a detail screen, which the user ought to return to
     * after following the access code flow, it will sort the stack to put this screen first.
     * When the user navigates back from this detail screen, they will land on the screen passed
     * to `defaultScreen` instead of navigate out of the module.
     *
     * The screen must be registered in this navigator. It is not added while
     * unavailable, for example during access-code verification. Existing multi-screen
     * history is preserved, and the default screen is never duplicated.
     *
     * Unlike `initialRouteName`, this prop adds a back destination rather than
     * selecting which screen opens first. Omit it to keep standard stack behavior.
     *
     * @example
     * ```tsx
     * const screenConfigPendingFirst = sortEntriesByKeyFirst(
     *   Object.entries(screenConfig),
     *   BoatChargingRouteName.myVignettes
     * )
     *
     * <Stack.Navigator defaultScreen={BoatChargingRouteName.map}>
     *   {screenConfigPendingFirst.map(([key, route]) => (
     *     <Stack.Screen key={key} {...route} />
     *   ))}
     * </Stack.Navigator>
     * ```
     * A pending vignettes screen opens above the map; Back returns to the map.
     */
    defaultScreen?: Extract<keyof T, string>
  }

  const CustomNavigator = ({
    defaultScreen,
    screenOptions,
    UNSTABLE_router: routerOverrides,
    ...props
  }: NavigatorProps) => {
    const isReduceMotionEnabled = useIsReduceMotionEnabled()

    return (
      <Navigator
        {...props}
        screenOptions={screenOptionsProps => ({
          animation: isReduceMotionEnabled ? 'none' : undefined,
          ...(typeof screenOptions === 'function'
            ? screenOptions(screenOptionsProps)
            : screenOptions),
        })}
        UNSTABLE_router={
          defaultScreen === undefined
            ? routerOverrides
            : originalRouter =>
                createDefaultScreenRouter(defaultScreen)({
                  ...originalRouter,
                  ...routerOverrides?.(originalRouter),
                })
        }
      />
    )
  }

  return {...rest, Navigator: CustomNavigator}
}
