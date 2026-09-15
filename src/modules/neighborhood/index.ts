import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {createClientModule} from '@/modules/utils/createModule'

export const clientModule = createClientModule({
  name: 'NeighborhoodModule',
  linking: {
    [ModuleSlug.neighborhood]: ModuleSlug.neighborhood,
  },
  slug: ModuleSlug.neighborhood,
})
