import type {
  NavigationAction,
  ParamListBase,
  Router,
  RouterConfigOptions,
  StackNavigationState,
} from '@react-navigation/native'

/**
 * Shared post-processing for all three router overrides below. Adds the default
 * screen beneath a lone non-default route, when available, without changing focus.
 *
 * @param state The navigation state to examine
 * @param options The navigator’s configuration
 * @param defaultScreen The screen name to insert, such as `BoatChargingRouteName.map`
 * @param router The underlying router, used to create a valid route
 * @returns A navigation state: either the original state or an updated copy.
 */
const prependDefaultScreen = <
  Params extends ParamListBase,
  Action extends NavigationAction,
>(
  state: StackNavigationState<Params>,
  options: RouterConfigOptions,
  defaultScreen: string,
  router: Router<StackNavigationState<Params>, Action>,
): StackNavigationState<Params> => {
  // Checks wether the `defaultScreen` exists inside the allowed route names as defined in the screen components.
  const defaultRouteName = state.routeNames.find(
    routeName => routeName === defaultScreen,
  )

  if (
    state.routes.length !== 1 || // Skip if there is not exactly one history entry
    state.routes[0].name === defaultScreen || // Skip if the only screen is already the default
    defaultRouteName === undefined // Skip if no default route name is available
  ) {
    return state
  }

  // Use the original rehydration method to build a proper route.
  const defaultRoute = router.getRehydratedState(
    {routes: [{name: defaultRouteName}]},
    options,
  ).routes[0] // Retrieve the default screen as proper route at index 0

  return {
    // Copy the current navigator's state
    ...state,
    // Increment the current navigator's state index by 1
    index: state.index + 1,
    // Prepend the generated default screen route before the current navigator's routes
    routes: [defaultRoute, ...state.routes],
  }
}

/**
 * Adds a Back destination without changing the visible screen. Each override
 * lets the original router calculate its state, then applies the shared helper.
 */
export const createDefaultScreenRouter =
  (defaultScreen: string) =>
  <Params extends ParamListBase, Action extends NavigationAction>(
    router: Router<StackNavigationState<Params>, Action>,
  ): Partial<Router<StackNavigationState<Params>, Action>> => ({
    /** Handles fresh stack creation, rather than restoring existing state. */
    getInitialState: options =>
      prependDefaultScreen(
        router.getInitialState(options),
        options,
        defaultScreen,
        router,
      ),
    /** Completes partial or restored state, then applies the same rules as fresh creation. */
    getRehydratedState: (state, options) =>
      prependDefaultScreen(
        router.getRehydratedState(state, options),
        options,
        defaultScreen,
        router,
      ),
    /**
     * Reconciles changes to available screens, such as an access-code gate opening,
     * then applies the same rules to the resulting stack.
     */
    getStateForRouteNamesChange: (state, options) =>
      prependDefaultScreen(
        router.getStateForRouteNamesChange(state, options),
        options,
        defaultScreen,
        router,
      ),
  })
