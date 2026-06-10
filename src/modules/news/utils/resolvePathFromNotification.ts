import {ModuleClientConfig} from '@/modules/types'

export type PushNotificationType = 'news:new-liveblog' | 'news:liveblog-update'

export const resolvePathFromNotification: ModuleClientConfig<{
  type?: PushNotificationType
}>['resolvePathFromNotification'] = notification => {
  if (!notification?.data?.type || !notification?.data?.linkSourceid) {
    return
  }

  const {type, linkSourceid} = notification.data

  if (type === 'news:new-liveblog' || type === 'news:liveblog-update') {
    return `/news/liveblog/${linkSourceid}`
  }
}
