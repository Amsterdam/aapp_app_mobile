import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {ModuleClientConfig} from '@/modules/types'

export const clientModule: ModuleClientConfig = {
  excludeFromHome: true,
  name: 'WasteContainerModule',
  slug: ModuleSlug['waste-container'],
}
