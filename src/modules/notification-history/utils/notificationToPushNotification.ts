import type {Notification} from '@/modules/notification-history/types'
import type {PushNotification} from '@/types/notification'

export const notificationToPushNotification = (
  notification: Notification,
): PushNotification => ({
  ...notification,
  data: notification.context,
})
