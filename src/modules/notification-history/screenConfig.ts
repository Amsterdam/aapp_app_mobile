import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  NotificationHistoryRouteName,
  type NotificationHistoryModalParams,
  type NotificationHistoryStackParams,
} from '@/modules/notification-history/routes'
import {NotificationExternalLinkScreen} from '@/modules/notification-history/screens/NotificationExternalLink.screen'
import {NotificationHistoryScreen} from '@/modules/notification-history/screens/NotificationHistory.screen'

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
    component: NotificationExternalLinkScreen,
    name: NotificationHistoryRouteName.NotificationRedirect,
    options: {
      headerShown: false,
    },
  },
}

export const notificationHistoryModals: StackNavigationRoutes<NotificationHistoryModalParams> =
  {}
