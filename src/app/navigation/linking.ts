import notifee, {EventType} from '@notifee/react-native'
import {
  getMessaging,
  getInitialNotification,
  onNotificationOpenedApp,
} from '@react-native-firebase/messaging'
import {getStateFromPath, LinkingOptions} from '@react-navigation/native'
import {Linking} from 'react-native'
import type {RootStackParams} from '@/app/navigation/types'
import {appPrefix} from '@/app/navigation/constants'
import {navigationRef} from '@/app/navigation/navigationRef'
import {resolvePathFromPushNotification} from '@/app/navigation/resolvePathFromPushNotification'
import {resolveModuleOnNotificationEvent} from '@/app/navigation/utils/resolveModuleOnNotificationEvent'
import {type ReduxDispatch} from '@/hooks/redux/types'
import {clientModules} from '@/modules/modules'
import {notificationHistoryApi} from '@/modules/notification-history/service'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'
import {moduleLinkings} from '@/modules/utils/moduleLinkings'
import {devLog} from '@/processes/development'
import {type RootState} from '@/store/types/rootState'

const messaging = getMessaging()

const markNotificationAsRead = (
  notificationId: string | number | object | undefined,
  dispatch: ReduxDispatch,
) => {
  if (typeof notificationId === 'string') {
    void dispatch(
      notificationHistoryApi.endpoints.markSingleNotificationRead.initiate({
        notificationId,
        isRead: true,
      }),
    )
  }
}

export const createLinking = (
  dispatch: ReduxDispatch,
  getState: () => RootState,
): LinkingOptions<RootStackParams> => ({
  prefixes: [appPrefix, 'https://www.amsterdam.nl', 'https://amsterdam.nl'],
  config: {
    screens: moduleLinkings,
  },
  // Handles URL's that opened the app from quit state
  getInitialURL: async () => {
    try {
      const url = await Linking.getInitialURL()

      if (url) {
        return url
      }

      const initialFirebaseNotification =
        await getInitialNotification(messaging)

      markNotificationAsRead(
        initialFirebaseNotification?.data?.notificationId,
        dispatch,
      )

      if (initialFirebaseNotification) {
        resolveModuleOnNotificationEvent(initialFirebaseNotification, dispatch)
        const pushNotification = {
          data: initialFirebaseNotification.data,
          title: initialFirebaseNotification.notification?.title,
          body: initialFirebaseNotification.notification?.body,
        }

        return resolvePathFromPushNotification(pushNotification)
      }
    } catch (error) {
      devLog(error)

      return
    }
  },
  // Use to customize parsing the URL to a navigation state
  getStateFromPath: (path, config) => {
    let state = getStateFromPath(path, config)

    if (state && !navigationRef.isReady()) {
      const {routes} = state
      const homeRouteName = ModuleSlug.home

      if (
        routes?.length === 1 &&
        (routes[0].name as ModuleSlug) !== homeRouteName
      ) {
        state = {
          ...state,
          routes: [{name: homeRouteName, params: undefined}, ...state.routes],
        }
      }
    }

    if (state) {
      state = clientModules.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (currentState, module: ModuleClientConfig<any, any>) => {
          if (typeof module.postProcessLinking !== 'function') {
            return currentState
          }

          const result = module.postProcessLinking(
            currentState,
            dispatch,
            getState,
          )

          return result ? {...currentState, ...result} : currentState
        },
        state,
      )
    }

    return state
  },

  // Use to handle deep-links and push notifications when the app is active (foreground or background)
  subscribe: (listener: (deeplink: string) => void) => {
    // Listen to incoming links from deep linking
    const subscription = Linking.addEventListener('url', ({url}) =>
      listener(url),
    )

    // Firebase background notification
    const unsubscribeOnNotificationOpenedApp = onNotificationOpenedApp(
      messaging,
      message => {
        markNotificationAsRead(message.data?.notificationId, dispatch)
        resolveModuleOnNotificationEvent(message, dispatch)

        const url = resolvePathFromPushNotification({
          data: message.data,
          title: message.notification?.title,
          body: message.notification?.body,
        })

        if (url) {
          listener(url)
        }
      },
    )

    // Notifee foreground notification
    const removeListener = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        markNotificationAsRead(
          detail.notification?.data?.notificationId,
          dispatch,
        )

        const url = resolvePathFromPushNotification(detail.notification)

        if (url) {
          listener(url)
        }
      }
    })

    return () => {
      subscription.remove()
      removeListener()
      unsubscribeOnNotificationOpenedApp()
    }
  },
})
