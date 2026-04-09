import {buildNotificationExternalLink} from '@/app/navigation/buildNotificationExternalLink'
import {createPathFromNotification} from '@/app/navigation/createPathFromNotification'
import {PushNotification} from '@/types/notification'
import {addAppPrefixToRoute} from '@/utils/addAppPrefixToRoute'

export const getRouteFromNotification = (
  notification?: PushNotification | null,
) => {
  if (!notification?.data) {
    return null
  }

  const route = createPathFromNotification(notification)
  const externalRoute = notification.data.url // This assumes the url will exist inside the data object. TODO: adjust if needed once url's are added to notifications.

  if (externalRoute) {
    return buildNotificationExternalLink(
      externalRoute,
      notification?.title,
      notification?.body,
    )
  }

  return addAppPrefixToRoute(route)
}
