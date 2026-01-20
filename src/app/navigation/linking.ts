import notifee, {EventType} from '@notifee/react-native'
import {getMessaging} from '@react-native-firebase/messaging'
import {getStateFromPath, LinkingOptions} from '@react-navigation/native'
import {Linking} from 'react-native'
import type {RootStackParams} from '@/app/navigation/types'
import {appPrefix} from '@/app/navigation/constants'
import {getRouteFromNotification} from '@/app/navigation/getRouteFromNotification'
import {navigationRef} from '@/app/navigation/navigationRef'
import {type ReduxDispatch} from '@/hooks/redux/types'
import {clientModules} from '@/modules/modules'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'
import {moduleLinkings} from '@/modules/utils/moduleLinkings'
import {devLog} from '@/processes/development'
import {type RootState} from '@/store/types/rootState'

export const createLinking = (
  dispatch: ReduxDispatch,
  getState: () => RootState,
): LinkingOptions<RootStackParams> => ({
  prefixes: [appPrefix, 'https://www.amsterdam.nl', 'https://amsterdam.nl'],
  config: {
    screens: moduleLinkings,
  },
  getInitialURL: async () => {
    try {
      const url = await Linking.getInitialURL()

      if (url) {
        return url
      }

      const initialNotifeeNotification = await notifee.getInitialNotification()

      const notifeeUrl = getRouteFromNotification(
        initialNotifeeNotification?.notification,
      )

      if (notifeeUrl) {
        return notifeeUrl
      }

      const initialFirebaseNotification =
        await getMessaging().getInitialNotification()

      return getRouteFromNotification({
        data: initialFirebaseNotification?.data,
        title: initialFirebaseNotification?.notification?.title,
        body: initialFirebaseNotification?.notification?.body,
      })
    } catch (error) {
      devLog(error)

      return null
    }
  },
  getStateFromPath: (path, config) => {
    let state: ReturnType<typeof getStateFromPath>
    const match = /module\/(.*)/.exec(path)

    if (match?.[1]) {
      const moduleName = match[1] as ModuleSlug

      state = {routes: [{name: moduleName, params: undefined}]}
    } else {
      state = getStateFromPath(path, config)
    }

    if (state && !navigationRef.isReady()) {
      const {routes} = state
      const homeRouteName = ModuleSlug.home

      if (
        routes?.length === 1 &&
        (routes[0].name as ModuleSlug) !== homeRouteName
      ) {
        state.routes.unshift({name: homeRouteName, params: undefined})
      }
    }

    if (state) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      clientModules.forEach((module: ModuleClientConfig<any, any>) => {
        if (typeof module.postProcessLinking === 'function') {
          const result = module.postProcessLinking(state, dispatch, getState)

          if (result) {
            Object.assign(state, result)
          }
        }
      })
    }

    return state
  },

  subscribe: (listener: (deeplink: string) => void) => {
    // Listen to incoming links from deep linking
    const subscription = Linking.addEventListener('url', ({url}) =>
      listener(url),
    )

    // Firebase background notification
    getMessaging().onNotificationOpenedApp(message => {
      const url = getRouteFromNotification({
        data: message.data,
        title: message.notification?.title,
        body: message.notification?.body,
      })

      if (url) {
        listener(url)
      }
    })

    // Notifee foreground notification
    const removeListener = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        const url = getRouteFromNotification(detail.notification)

        if (url) {
          listener(url)
        }
      }
    })

    return () => {
      subscription.remove()
      removeListener()
    }
  },
})
