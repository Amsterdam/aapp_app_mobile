import {NotificationHistoryRouteName} from '@/modules/notification-history/routes'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const notificationHistoryModule = createClientModule({
  hiddenInMenu: true,
  name: 'NotificationHistoryModule',
  slug: ModuleSlug['notification-history'],
  alwaysEnabled: true,
  linking: {
    [NotificationHistoryRouteName.NotificationExternalLink]: {
      path: '/notification-external-link',
    },
  },
})
