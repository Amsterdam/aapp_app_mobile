import {NewsSlice, type NewsState} from '@/modules/news/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof NewsState)[] = [
  'selectedDistrict',
  'highlightedArticleId',
]

export const newsModule = createClientModule({
  name: 'NewsModule',
  slug: ModuleSlug.news,
  linking: {
    [ModuleSlug.news]: ModuleSlug.news,
  },
  reduxConfigs: [
    {
      key: ReduxKey.news,
      persistVersion: 0,
      persistWhitelist,
      slice: NewsSlice,
    },
  ],
})
