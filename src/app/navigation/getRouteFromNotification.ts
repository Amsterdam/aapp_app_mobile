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
  const externalRoute = notification.data.url

  if (externalRoute) {
    return appPrefix + `notification-external-link?url=${externalRoute}`
  }

  return route ? appPrefix + route.slice(1) : null
}
