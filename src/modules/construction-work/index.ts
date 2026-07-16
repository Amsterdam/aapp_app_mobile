import {resolvePathFromNotification} from '@/modules/construction-work/notifications/resolvePathFromNotification'
import {ConstructionWorkRouteName} from '@/modules/construction-work/routes'
import {
  type ConstructionWorkState,
  constructionWorkSlice,
} from '@/modules/construction-work/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof ConstructionWorkState)[] = ['readArticles']

export const clientModule = createClientModule({
  linking: {
    [ModuleSlug['construction-work']]: ModuleSlug['construction-work'],
    [ConstructionWorkRouteName.projectNews]:
      'construction-work/news/:id/:screenHeaderTitle/:screenTitle/:isPushNotificationDeeplink?',
    [ConstructionWorkRouteName.projectWarning]:
      'construction-work/warning/:id/:screenHeaderTitle/:screenTitle/:isPushNotificationDeeplink?',
    [ConstructionWorkRouteName.project]: 'construction-work/project/:id',
  },
  logDimension: PiwikSessionDimension.constructionWorkModule,
  name: 'ConstructionWorkModule',
  reduxConfigs: [
    {
      key: ReduxKey.constructionWork,
      persistVersion: 0,
      persistWhitelist,
      slice: constructionWorkSlice,
    },
  ],
  slug: ModuleSlug['construction-work'],
  resolvePathFromNotification,
})
