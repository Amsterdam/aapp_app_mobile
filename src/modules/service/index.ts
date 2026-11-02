import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {migrationManifest} from '@/modules/service/migrations'
import {serviceSlice} from '@/modules/service/slice'
import {createClientModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

export const clientModule = createClientModule({
  name: 'ServiceModule',
  slug: ModuleSlug.service,
  linking: {
    [ModuleSlug.service]: ModuleSlug.service,
  },
  reduxConfigs: [
    {
      key: ReduxKey.service,
      migrations: migrationManifest,
      persistVersion: 1,
      slice: serviceSlice,
    },
  ],
})
