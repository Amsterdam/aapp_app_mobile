import {maximizeChat} from '@/modules/chat/slice'
import {type ModuleClientConfig} from '@/modules/types'

export const onNotificationEvent: ModuleClientConfig['onNotificationEvent'] = (
  notification,
  dispatch,
) => {
  if (!notification?.data?.maximizeChat) {
    return
  }

  dispatch(maximizeChat())
}
