import {ModuleSlug} from '@/modules/slugs'
import {sportSlice} from '@/modules/sport/slice'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

export const sportModule = createClientModule({
  name: 'SportModule',
  slug: ModuleSlug.sport,
  reduxConfigs: [
    {
      key: ReduxKey.sport,
      persistVersion: 0,
      slice: sportSlice,
    },
  ],
})
