import notifee, {EventType} from '@notifee/react-native'
import {useEffect, useRef} from 'react'
import {useModules} from '@/hooks/useModules'
import {useMarkSingleNotificationReadMutation} from '@/modules/notification-history/service'
import {store} from '@/store/store'

export const HandleNotificationEvent = () => {
  const {enabledModules} = useModules()
  const enabledModulesRef = useRef(enabledModules)
  const [markNotificationAsRead] = useMarkSingleNotificationReadMutation()

  // this ref trick is used to not trigger a new listener on the notifee background event and still have the latest information
  enabledModulesRef.current = enabledModules

  useEffect(() => {
    notifee.onBackgroundEvent(({type, detail}) => {
      const notificationId = detail.notification?.data?.notificationId

      if (type === EventType.PRESS && typeof notificationId === 'string') {
        void markNotificationAsRead({notificationId, isRead: true})
      }

      enabledModulesRef.current
        ?.find(module => module.slug === detail.notification?.data?.module)
        ?.onNotificationEvent?.(type, detail, true, store.dispatch)

      return Promise.resolve()
    })
  }, [markNotificationAsRead])

  return null
}
