import {onMyAddressChanged} from '@/modules/burning-guide/onMyAddressChanged'
import {onNotificationEvent} from '@/modules/burning-guide/onNotificationEvent'
import {BurningGuideRouteName} from '@/modules/burning-guide/routes'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const burningGuideModule = createClientModule({
  name: 'BurningGuideModule',
  slug: ModuleSlug['burning-guide'],
  requiresFirebaseToken: true,
  onMyAddressChanged,
  onNotificationEvent,
  linking: {
    [BurningGuideRouteName.burningGuide]: {
      path: '/burning-guide',
    },
  },
})
