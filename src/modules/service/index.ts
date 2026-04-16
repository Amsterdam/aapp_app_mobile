import {serviceSlice} from '@/modules/service/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

export const serviceModule = createClientModule({
  name: 'ServiceModule',
  slug: ModuleSlug.service,
  linking: {
    [ModuleSlug.service]: ModuleSlug.service,
  },
  reduxConfigs: [
    {
      key: ReduxKey.service,
      persistVersion: 0,
      slice: serviceSlice,
    },
  ],
})
