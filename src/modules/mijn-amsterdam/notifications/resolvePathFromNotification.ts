import type {ModuleClientConfig} from '@/modules/types'

const MIJN_AMS_LOGOUT_TYPE = 'mijn-ams-logout'

const mapTypeToRoute: Record<string, string> = {
  [MIJN_AMS_LOGOUT_TYPE]: 'mijn-amsterdam/logout',
} as const

export const resolvePathFromNotification: ModuleClientConfig<{
  subtype?: 'article' | 'warning'
  type?: string
}>['resolvePathFromNotification'] = (
  notification,
  isPushNotificationDeeplink,
) => {
  if (
    !notification?.data?.type ||
    !(notification.data.type in mapTypeToRoute)
  ) {
    return
  }

  return `${mapTypeToRoute[notification.data.type]}/${isPushNotificationDeeplink}` // Linking is handled by user module
}
