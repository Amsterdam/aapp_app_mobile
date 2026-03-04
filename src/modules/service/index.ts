import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const serviceModule = createClientModule({
  name: 'ServiceModule',
  slug: ModuleSlug.service,
})
