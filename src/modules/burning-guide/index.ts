import {onNotificationEvent} from '@/modules/burning-guide/onNotificationEvent'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const burningGuideModule = createClientModule({
  name: 'BurningGuideModule',
  slug: ModuleSlug['burning-guide'],
  linking: {
    [ModuleSlug['burning-guide']]: ModuleSlug['burning-guide'],
  },
  requiresFirebaseToken: true,
  onNotificationEvent,
})
