import type {ModuleSlug} from '@/modules/slugs'
import type {Notification} from '@notifee/react-native'

export type NotificationQueryArg = {
  body: string
  news_identifier?: string
  project_identifier: string
  title: string
  warning_identifier?: string
}

export type PushNotificationDataDefault = {
  linkSourceid?: string
  module_slug?: ModuleSlug
  url?: string // This assumes the url will exist inside the data object. TODO: adjust if needed once url's are added to notifications.
}

export type PushNotification<
  T extends Record<string, unknown> = Record<string, unknown>,
> = Notification & {data?: PushNotificationDataDefault & T}
