import type {
  NavigationAction,
  ParamListBase,
  Router,
  RouterConfigOptions,
  StackNavigationState,
} from '@react-navigation/native'

const prependDefaultScreen = <
  Params extends ParamListBase,
  Action extends NavigationAction,
>(
  state: StackNavigationState<Params>,
  options: RouterConfigOptions,
  defaultScreen: string,
  router: Router<StackNavigationState<Params>, Action>,
): StackNavigationState<Params> => {
  const defaultRouteName = state.routeNames.find(
    routeName => routeName === defaultScreen,
  )

  if (
    state.routes.length !== 1 ||
    state.routes[0].name === defaultScreen ||
    defaultRouteName === undefined
  ) {
    return state
  }

  const defaultRoute = router.getRehydratedState(
    {routes: [{name: defaultRouteName}]},
    options,
  ).routes[0]

  return {
    ...state,
    index: state.index + 1,
    routes: [defaultRoute, ...state.routes],
  }
}

export const createDefaultScreenRouter =
  (defaultScreen: string) =>
  <Params extends ParamListBase, Action extends NavigationAction>(
    router: Router<StackNavigationState<Params>, Action>,
  ): Partial<Router<StackNavigationState<Params>, Action>> => ({
    getInitialState: options =>
      prependDefaultScreen(
        router.getInitialState(options),
        options,
        defaultScreen,
        router,
      ),
    getRehydratedState: (state, options) =>
      prependDefaultScreen(
        router.getRehydratedState(state, options),
        options,
        defaultScreen,
        router,
      ),
    getStateForRouteNamesChange: (state, options) =>
      prependDefaultScreen(
        router.getStateForRouteNamesChange(state, options),
        options,
        defaultScreen,
        router,
      ),
  })
