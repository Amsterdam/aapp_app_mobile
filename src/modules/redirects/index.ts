import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {createClientModule} from '@/modules/utils/createModule'
import {PiwikSessionDimension} from '@/processes/piwik/types'

export const module = createClientModule({
  logDimension: PiwikSessionDimension.redirectsModule,
  name: 'RedirectsModule',
  slug: ModuleSlug.redirects,
})
