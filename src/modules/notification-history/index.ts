import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {NotificationHistoryRouteName} from '@/modules/notification-history/routes'
import {createClientModule} from '@/modules/utils/createModule'

export const clientModule = createClientModule({
  excludeFromHome: true,
  name: 'NotificationHistoryModule',
  slug: ModuleSlug['notification-history'],
  alwaysEnabled: true,
  linking: {
    [ModuleSlug['notification-history']]: ModuleSlug['notification-history'],
    [NotificationHistoryRouteName.NotificationRedirect]: {
      path: '/notification-redirect',
    },
  },
})
