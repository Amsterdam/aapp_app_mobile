import {EventType} from '@notifee/react-native'
import {allModules} from '@/modules/modules'
import {store} from '@/store/store'
import {type PushNotification} from '@/types/notification'
import {stripAppPrefixFromRoute} from '@/utils/stripAppPrefixFromRoute'

export const createPathFromNotification = (
  notification: PushNotification,
  isPushNotificationDeeplink = true,
) => {
  const module = allModules.find(
    m => m.slug === notification?.data?.module_slug,
  )

  if (!module) {
    return stripAppPrefixFromRoute(notification?.data?.deeplink)
  }

  const pathFromNotification =
    'onNotificationEvent' in module
      ? module.onNotificationEvent?.(
          EventType.PRESS,
          {
            notification,
          },
          isPushNotificationDeeplink,
          store.dispatch,
        )
      : undefined

  if (pathFromNotification && typeof pathFromNotification === 'string') {
    return pathFromNotification
  }

  return `/${notification?.data?.module_slug}`
}
