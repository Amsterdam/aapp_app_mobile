import {messageDraftSlice} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {constructionWorkEditorSlice} from '@/modules/construction-work-editor/slice'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {createClientModule} from '@/modules/utils/createModule'
import {PiwikSessionDimension} from '@/processes/piwik/types'
import {ReduxKey} from '@/store/types/reduxKey'

export const clientModule = createClientModule({
  requiresAuthorization: true,
  linking: {
    [ConstructionWorkEditorRouteName.authorizedProjects]:
      'construction-work-editor/:accessToken?',
  },
  logDimension: PiwikSessionDimension.constructionWorkEditorModule,
  name: 'ConstructionWorkEditorModule',
  reduxConfigs: [
    {
      key: ReduxKey.constructionWorkEditor,
      persistVersion: 0,
      slice: constructionWorkEditorSlice,
    },
    {
      key: ReduxKey.messageDraft,
      persistVersion: 0,
      slice: messageDraftSlice,
    },
  ],
  slug: ModuleSlug['construction-work-editor'],
})
