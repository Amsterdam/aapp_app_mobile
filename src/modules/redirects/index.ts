import {RedirectsRouteName} from '@/modules/redirects/routes'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {PiwikSessionDimension} from '@/processes/piwik/types'

export const redirectsModule = createClientModule({
  linking: {
    [RedirectsRouteName.redirects]: {
      path: `/${ModuleSlug.redirects}`,
    },
  },
  logDimension: PiwikSessionDimension.redirectsModule,
  name: 'RedirectsModule',
  slug: ModuleSlug.redirects,
})
