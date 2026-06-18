import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  NotificationHistoryRouteName,
  type ModuleStackParams,
} from '@/modules/notification-history/routes'
import {NotificationHistoryScreen} from '@/modules/notification-history/screens/NotificationHistory.screen'
import {NotificationRedirectScreen} from '@/modules/notification-history/screens/NotificationRedirect.screen'

export const screenConfig: StackNavigationRoutes<
  ModuleStackParams,
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
      headerTitle: 'Melding',
    },
  },
}
