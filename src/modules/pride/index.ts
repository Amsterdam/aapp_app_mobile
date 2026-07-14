import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const module = createClientModule({
  name: 'PrideModule',
  linking: {
    [ModuleSlug.pride]: ModuleSlug.pride,
  },
  slug: ModuleSlug.pride,
  moduleTitleColor: 'cityPass',
})
