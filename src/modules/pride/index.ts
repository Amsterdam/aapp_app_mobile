import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {createClientModule} from '@/modules/utils/createModule'

export const prideModule = createClientModule({
  name: 'PrideModule',
  linking: {
    [ModuleSlug.pride]: ModuleSlug.pride,
  },
  slug: ModuleSlug.pride,
  moduleTitleColor: 'cityPass',
})
