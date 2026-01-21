import {buildNotificationExternalLink} from '@/app/navigation/buildNotificationExternalLink'
import {appPrefix} from '@/app/navigation/constants'
import {createPathFromNotification} from '@/app/navigation/createPathFromNotification'
import {PushNotification} from '@/types/notification'

export const getRouteFromNotification = (
  notification?: PushNotification | null,
) => {
  if (!notification?.data) {
    return null
  }

  const route = createPathFromNotification(notification)
  const externalRoute = notification.data.url // This assumes the url will exist inside the data object. TODO: adjust if needed once url's are added to notifications.

  if (externalRoute) {
    return buildNotificationExternalLink(externalRoute)
  }

  return route ? appPrefix + route.slice(1) : null
}
