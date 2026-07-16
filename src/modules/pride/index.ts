import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const clientModule = createClientModule({
  name: 'PrideModule',
  linking: {
    [ModuleSlug.pride]: ModuleSlug.pride,
  },
  slug: ModuleSlug.pride,
  moduleTitleColor: 'cityPass',
})
