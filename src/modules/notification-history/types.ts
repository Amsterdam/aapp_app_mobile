import {ModuleSlug} from '@/modules/slugs'
import {type PushNotificationDataDefault} from '@/types/notification'

export type GetNotificationsResult = Notification[]

export enum NotificationModule {
  Modules = 'modules',
}

export type Notification = {
  body: string
  context: PushNotificationDataDefault & Record<string, unknown>
  created_at: string
  id: string
  image?: NotificationImage
  is_read: boolean
  module_slug: ModuleSlug | NotificationModule
  pushed_at: string
  title: string
}

type NotificationImage = {
  description: string
  id: number
  sources: {height: number; uri: string; width: number}[]
}
