import {NewsRouteName} from '@/modules/news/routes'
import {NewsSlice, type NewsState} from '@/modules/news/slice'
import {resolvePathFromNotification} from '@/modules/news/utils/resolvePathFromNotification'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof NewsState)[] = [
  'selectedDistrict',
  'highlightedArticles',
]

export const module = createClientModule({
  name: 'NewsModule',
  slug: ModuleSlug.news,
  linking: {
    [ModuleSlug.news]: ModuleSlug.news,
    [NewsRouteName.liveblog]: 'news/liveblog/:id',
  },
  reduxConfigs: [
    {
      key: ReduxKey.news,
      persistVersion: 0,
      persistWhitelist,
      slice: NewsSlice,
    },
  ],
  resolvePathFromNotification,
})
