import type {ModuleClientConfig} from '@/modules/types'

const MIJN_AMS_LOGOUT_TYPE = 'mijn-ams-logout'

const mapTypeToRoute: Record<string, string> = {
  [MIJN_AMS_LOGOUT_TYPE]: 'mijn-amsterdam/logout',
} as const

export const resolvePathFromNotification: ModuleClientConfig<{
  subtype?: 'article' | 'warning'
  type?: string
>}['resolvePathFromNotification'] = (
  notification,
  _isPushNotificationDeeplink,
) => {
  const type = notification?.data?.type

  if (!type || !Object.prototype.hasOwnProperty.call(mapTypeToRoute, type)) {
    return
  }

  return `/${mapTypeToRoute[type]}`
}
