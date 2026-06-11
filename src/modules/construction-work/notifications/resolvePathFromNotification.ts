import {ModuleClientConfig} from '@/modules/types'

const ARTICLE_MESSAGE_TYPE = 'construction-work:article-message'

export type PushNotificationRouteConfig = {
  route: string
}

export type PushNotificationType =
  | 'NewsUpdatedByProjectManager'
  | 'ProjectWarningCreatedByProjectManager'
  | typeof ARTICLE_MESSAGE_TYPE

type LegacyPushNotificationType = Exclude<
  PushNotificationType,
  typeof ARTICLE_MESSAGE_TYPE
>

export const pushNotificationTypes: Record<
  LegacyPushNotificationType,
  PushNotificationRouteConfig
> = {
  NewsUpdatedByProjectManager: {
    route: 'news',
  },
  ProjectWarningCreatedByProjectManager: {
    route: 'warning',
  },
}

export const resolvePathFromNotification: ModuleClientConfig<{
  subtype?: 'article' | 'warning'
  type?: PushNotificationType
}>['resolvePathFromNotification'] = (
  notification,
  isPushNotificationDeeplink,
) => {
  if (!notification?.data?.type) {
    return
  }

  const {subtype, type} = notification.data

  let route: string | undefined

  if (type === ARTICLE_MESSAGE_TYPE) {
    route = `${subtype === 'article' ? 'news' : subtype}`
  }

  // TODO: Remove this when the app version has exceeded 1.30.0. Check with backend first to be certain.
  const legacyRoute =
    pushNotificationTypes[type as LegacyPushNotificationType]?.route

  if (legacyRoute) {
    route = legacyRoute
  }

  if (!route || !notification?.data?.linkSourceid) {
    return
  }

  const analyticsTitle = encodeURIComponent(
    `${notification.title ?? ''} - ${notification.body ?? ''}`,
  )

  return `/construction-work/${route}/${notification.data.linkSourceid}/${encodeURIComponent(notification.title ?? '')}/${analyticsTitle}/${isPushNotificationDeeplink}`
}
