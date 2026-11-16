import {
  CommonActions,
  StackActions,
  StackRouter,
  type RouterConfigOptions,
} from '@react-navigation/native'
import {createDefaultScreenRouter} from '@/app/navigation/createDefaultScreenRouter'

const defaultScreen = 'BoatChargingMap'
const pendingScreen = 'BoatChargingMyVignettes'
const accessCodeScreen = 'AccessCode'
const options: RouterConfigOptions = {
  routeNames: [pendingScreen, defaultScreen],
  routeParamList: {
    [defaultScreen]: {zoom: 12},
  },
  routeGetIdList: {},
}

const createRouter = () => {
  const router = StackRouter({})

  return {...router, ...createDefaultScreenRouter(defaultScreen)(router)}
}

describe('createDefaultScreenRouter', () => {
  it('opens the pending screen with the map beneath it and preserves its route key', () => {
    const router = StackRouter({})
    const initialState = router.getInitialState(options)
    const configuredRouter = {
      ...router,
      ...createDefaultScreenRouter(defaultScreen)({
        ...router,
        getInitialState: () => initialState,
      }),
    }
    const state = configuredRouter.getInitialState(options)

    expect(state.routes).toMatchObject([
      {name: defaultScreen, params: {zoom: 12}},
      initialState.routes[0],
    ])
    expect(typeof state.routes[0].key).toBe('string')
    expect(state.routes[1]).toBe(initialState.routes[0])
    expect(state.index).toBe(1)
    expect(state.key).toBe(initialState.key)
  })

  it.each([CommonActions.goBack(), StackActions.pop(1)])(
    'returns to the map for $type',
    action => {
      const router = createRouter()
      const initialState = router.getInitialState(options)
      const state = router.getStateForAction(initialState, action, options)

      expect(state?.routes.map(route => route.name)).toEqual([defaultScreen])
      expect(state?.index).toBe(0)
      expect(
        state &&
          router.getStateForAction(
            router.getRehydratedState(state, options),
            CommonActions.goBack(),
            options,
          ),
      ).toBeNull()
    },
  )

  it('does not duplicate the map when it is already the initial screen', () => {
    const router = createRouter()
    const state = router.getInitialState({
      ...options,
      routeNames: [defaultScreen, pendingScreen],
    })

    expect(state.routes.map(route => route.name)).toEqual([defaultScreen])
    expect(state.index).toBe(0)
  })

  it('keeps the map unavailable while access-code verification is required', () => {
    const router = createRouter()
    const state = router.getInitialState({
      ...options,
      routeNames: [accessCodeScreen],
    })

    expect(state.routes.map(route => route.name)).toEqual([accessCodeScreen])
    expect(state.index).toBe(0)
  })

  it('adds the map when the access-code gate exposes the pending screen', () => {
    const router = createRouter()
    const gatedState = router.getInitialState({
      ...options,
      routeNames: [accessCodeScreen],
    })
    const state = router.getStateForRouteNamesChange(gatedState, {
      ...options,
      routeKeyChanges: [],
    })

    expect(state.routes.map(route => route.name)).toEqual([
      defaultScreen,
      pendingScreen,
    ])
    expect(state.index).toBe(1)
    expect(state.routes.some(route => route.name === accessCodeScreen)).toBe(
      false,
    )
  })

  it('removes the map again when the access-code gate closes', () => {
    const router = createRouter()
    const state = router.getStateForRouteNamesChange(
      router.getInitialState(options),
      {
        ...options,
        routeNames: [accessCodeScreen],
        routeKeyChanges: [],
      },
    )

    expect(state.routes.map(route => route.name)).toEqual([accessCodeScreen])
    expect(state.index).toBe(0)
  })

  it('preserves pending route parameters when rehydrating a direct destination', () => {
    const router = createRouter()
    const state = router.getRehydratedState(
      {
        routes: [
          {name: pendingScreen, key: 'pending-key', params: {vignetId: '123'}},
        ],
      },
      options,
    )

    expect(state.routes).toMatchObject([
      {name: defaultScreen, params: {zoom: 12}},
      {
        name: pendingScreen,
        key: 'pending-key',
        params: {vignetId: '123'},
      },
    ])
    expect(typeof state.routes[0].key).toBe('string')
    expect(state.index).toBe(1)
  })

  it('does not insert the map into an existing multi-screen history', () => {
    const router = createRouter()
    const state = router.getRehydratedState(
      {
        routes: [{name: pendingScreen}, {name: 'BoatChargingVignet'}],
      },
      {...options, routeNames: [...options.routeNames, 'BoatChargingVignet']},
    )

    expect(state.routes.map(route => route.name)).toEqual([
      pendingScreen,
      'BoatChargingVignet',
    ])
    expect(state.index).toBe(1)
  })

  it('does not reinsert the pending screen after navigating back and rehydrating', () => {
    const router = createRouter()
    const initialState = router.getInitialState(options)
    const state = router.getRehydratedState(
      {...initialState, index: 0, routes: [initialState.routes[0]]},
      options,
    )

    expect(state.routes.map(route => route.name)).toEqual([defaultScreen])
    expect(state.index).toBe(0)
  })
})
