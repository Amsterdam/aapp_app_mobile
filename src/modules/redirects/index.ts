import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {PiwikSessionDimension} from '@/processes/piwik/types'

export const clientModule = createClientModule({
  logDimension: PiwikSessionDimension.redirectsModule,
  name: 'RedirectsModule',
  slug: ModuleSlug.redirects,
})
