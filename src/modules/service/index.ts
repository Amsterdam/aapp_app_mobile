import {ServiceRouteName} from '@/modules/service/routes'
import {serviceSlice} from '@/modules/service/slice'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

export const serviceModule = createClientModule({
  linking: {
    [ServiceRouteName.map]: {
      path: `/${ModuleSlug.service}`,
    },
  },
  name: 'ServiceModule',
  slug: ModuleSlug.service,
  reduxConfigs: [
    {
      key: ReduxKey.service,
      persistVersion: 0,
      slice: serviceSlice,
    },
  ],
})
