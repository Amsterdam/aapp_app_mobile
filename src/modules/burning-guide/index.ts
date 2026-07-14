import {onNotificationEvent} from '@/modules/burning-guide/onNotificationEvent'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {createClientModule} from '@/modules/utils/createModule'

export const burningGuideModule = createClientModule({
  name: 'BurningGuideModule',
  slug: ModuleSlug['burning-guide'],
  linking: {
    [ModuleSlug['burning-guide']]: ModuleSlug['burning-guide'],
  },
  onNotificationEvent,
  extraSaveAddressText: 'U kunt ook meldingen ontvangen voor Mijn adres.',
})
