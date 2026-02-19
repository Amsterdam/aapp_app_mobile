import {ModuleSlug} from '@/modules/slugs'
import {surveySlice} from '@/modules/survey/slice'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

export const surveyModule = createClientModule({
  alwaysEnabled: true,
  excludeFromHome: true,
  name: 'SurveyModule',
  reduxConfigs: [
    {
      key: ReduxKey.survey,
      persistVersion: 0,
      slice: surveySlice,
    },
  ],
  slug: ModuleSlug.survey,
})
