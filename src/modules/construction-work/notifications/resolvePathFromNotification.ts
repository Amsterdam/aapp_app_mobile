import {ModuleClientConfig} from '@/modules/types'

export type PushNotificationRouteConfig = {
  id: PushNotificationType
  route: string
}

export type PushNotificationType =
  | 'NewsUpdatedByProjectManager'
  | 'ProjectWarningCreatedByProjectManager'

export const pushNotificationTypes: Record<
  PushNotificationType,
  PushNotificationRouteConfig
> = {
  NewsUpdatedByProjectManager: {
    id: 'NewsUpdatedByProjectManager',
    route: '/news',
  },
  ProjectWarningCreatedByProjectManager: {
    id: 'ProjectWarningCreatedByProjectManager',
    route: '/warning',
  },
}

export const resolvePathFromNotification: ModuleClientConfig<{
  type?: PushNotificationType
}>['resolvePathFromNotification'] = (
  notification,
  isPushNotificationDeeplink,
) => {
  const notificationType =
    notification?.data?.type && pushNotificationTypes[notification.data.type]

  if (!notificationType?.route || !notification?.data?.linkSourceid) {
    return
  }

  const analyticsTitle = encodeURIComponent(
    `${notification.title ?? ''} - ${notification.body ?? ''}`,
  )

  return `${notificationType.route}/${notification.data.linkSourceid}/${encodeURIComponent(notification.title ?? '')}/${analyticsTitle}/${isPushNotificationDeeplink}`
}
