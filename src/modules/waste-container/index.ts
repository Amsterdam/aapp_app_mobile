import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const clientModule: ModuleClientConfig = {
  excludeFromHome: true,
  name: 'WasteContainerModule',
  slug: ModuleSlug['waste-container'],
}
