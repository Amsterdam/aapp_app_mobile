import {
  NavigationContainerEventMap,
  NavigationContainerRefWithCurrent,
  Route,
} from '@react-navigation/native'
import {useRef, useCallback, useEffect, useContext} from 'react'
import {RootStackParams} from '@/app/navigation/types'
import {devError, devLog} from '@/processes/development'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'
import {createCustomDimensionsFromRouteParams} from '@/processes/piwik/utils/createCustomDimensionsFromRouteParams'
import {getTitleFromParams} from '@/processes/piwik/utils/getTitleFromParams'
import {useAppInsights} from '@/providers/appinsights.provider'
// eslint-disable-next-line no-restricted-imports
import {PiwikContext} from '@/providers/piwik.context'

const MAX_RECENT_ROUTE_LENGTH = 200

export const useRegisterNavigationContainerForLogging = () => {
  const navigationContainer = useRef<
    NavigationContainerRefWithCurrent<RootStackParams> | undefined
  >(undefined)
  const navigationStartTime = useRef<number | undefined>(undefined)
  const recentRouteKeys = useRef<string[]>([])
  const latestRoute = useRef<Route<string> | undefined>(undefined)
  const trackException = useTrackException()
  const appInsights = useAppInsights()

  const piwikInstance = useContext(PiwikContext)

  /**
   * This method is responsible for storing the start time of every React-Navigation action dispatch.
   */
  const onDispatch = useCallback(
    (params?: NavigationContainerEventMap['__unsafe_action__']): void => {
      const noop = params?.data.noop

      if (noop) {
        return
      }

      navigationStartTime.current = new Date().getTime()
    },
    [],
  )

  /**
   * The `_pushRecentRouteKey` method is responsible for adding a new route key to the list of recent route keys stored in the `_recentRouteKeys` array.
   * If the number of route keys exceeds the maximum allowed length specified by `_maxRecentRouteLen`, it will trim the array to keep only the most recent route keys based on the maximum length.
   */
  const pushRecentRouteKey = useCallback((key: string): void => {
    recentRouteKeys.current.push(key)

    if (recentRouteKeys.current.length > MAX_RECENT_ROUTE_LENGTH) {
      recentRouteKeys.current = recentRouteKeys.current.slice(
        recentRouteKeys.current.length - MAX_RECENT_ROUTE_LENGTH,
      )
    }
  }, [])

  /**
   * This method is responsible for saving the new navigation state as screen view
   */
  const onStateChange = useCallback(
    (
      _?: NavigationContainerEventMap['state'],
      isInitialState = false,
    ): void => {
      const previousRoute = latestRoute.current

      if (!navigationContainer.current) {
        devError(
          'Missing navigation container ref. Route transactions will not be sent.',
        )

        return
      }

      const route = navigationContainer.current.getCurrentRoute()

      if (route && (navigationStartTime.current || isInitialState)) {
        if (!previousRoute || previousRoute.key !== route.key) {
          const routeHasBeenSeen = recentRouteKeys.current.includes(route.key)

          const {
            appInsights: customDimensionsAppInsights,
            piwik: customDimensionsPiwik,
          } = createCustomDimensionsFromRouteParams(route.params)

          if (piwikInstance) {
            piwikInstance
              .trackScreen(route.name, {
                title: getTitleFromParams(route.params),
                customDimensions: customDimensionsPiwik as {
                  [index: number]: string
                },
              })
              .catch(() => {
                trackException(
                  ExceptionLogKey.piwikTrackScreen,
                  'useRegisterNavigationContainerForLogging',
                )
              })
          }

          appInsights.trackPageView({
            name: route.name,
            uri: route.path,
            refUri: previousRoute?.name,
            properties: {
              title: getTitleFromParams(route.params),
              routeHasBeenSeen,
              ...customDimensionsAppInsights,
              ...(navigationStartTime.current
                ? {duration: new Date().getTime() - navigationStartTime.current}
                : {}),
            },
          })
        }

        pushRecentRouteKey(route.key)
        latestRoute.current = route

        navigationStartTime.current = undefined
      }
    },
    [appInsights, piwikInstance, pushRecentRouteKey, trackException],
  )

  /**
   * Setup the navigation listeners
   */
  const registerListeners = useCallback(() => {
    if (navigationContainer.current) {
      const unRegisterDispatch = navigationContainer.current.addListener(
        '__unsafe_action__', // This action is emitted on every dispatch
        onDispatch,
      )
      const unRegisterStateChange = navigationContainer.current.addListener(
        'state', // This action is emitted on every state change
        onStateChange,
      )

      // Navigation container already registered, just populate with route state
      onStateChange(undefined, true)

      return () => {
        unRegisterDispatch()
        unRegisterStateChange()
      }
    }

    return () => null
  }, [onDispatch, onStateChange])

  /**
   * Setup the navigation listeners again, when one of the dependencies changes
   */
  useEffect(registerListeners, [registerListeners])

  /**
   * This method is responsible for registering the navigation container with the useRegisterNavigationContainer hook.
   */
  return useCallback(
    (
      navigationContainerRef: NavigationContainerRefWithCurrent<RootStackParams>,
    ): void => {
      // only register the navigation container once
      if (!navigationContainer.current) {
        if ('current' in navigationContainerRef) {
          navigationContainer.current =
            navigationContainerRef.current as NavigationContainerRefWithCurrent<RootStackParams>
          registerListeners()
        } else {
          devError('Received invalid navigation container ref')
        }
      } else {
        devLog(
          'Navigation logger already exists, but register has been called again, doing nothing.',
        )
      }
    },
    [registerListeners],
  )
}
