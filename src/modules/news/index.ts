import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const newsModule = createClientModule({
  name: 'NewsModule',
  slug: ModuleSlug.news,
  linking: {
    [ModuleSlug.news]: ModuleSlug.news,
  },
})
