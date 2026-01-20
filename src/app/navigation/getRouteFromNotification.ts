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

  return externalRoute || (route ? appPrefix + route.slice(1) : null)
}
