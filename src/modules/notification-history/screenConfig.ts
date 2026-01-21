import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  NotificationHistoryRouteName,
  type NotificationHistoryModalParams,
  type NotificationHistoryStackParams,
} from '@/modules/notification-history/routes'
import {NotificationHistoryScreen} from '@/modules/notification-history/screens/NotificationHistory.screen'
import {NotificationRedirectScreen} from '@/modules/notification-history/screens/NotificationRedirect.screen'

export const screenConfig: StackNavigationRoutes<
  NotificationHistoryStackParams,
  NotificationHistoryRouteName
> = {
  [NotificationHistoryRouteName.NotificationHistory]: {
    component: NotificationHistoryScreen,
    name: NotificationHistoryRouteName.NotificationHistory,
    options: {
      headerTitle: 'Meldingen',
    },
  },
  [NotificationHistoryRouteName.NotificationRedirect]: {
    component: NotificationRedirectScreen,
    name: NotificationHistoryRouteName.NotificationRedirect,
    options: {
      headerShown: false,
    },
  },
}

export const notificationHistoryModals: StackNavigationRoutes<NotificationHistoryModalParams> =
  {}
