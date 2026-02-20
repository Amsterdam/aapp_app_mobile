import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const wasteContainerModule: ModuleClientConfig = {
  excludeFromHome: true,
  name: 'WasteContainerModule',
  slug: ModuleSlug['waste-container'],
}
