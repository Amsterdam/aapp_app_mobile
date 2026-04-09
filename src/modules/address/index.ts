import {AddressRouteName} from '@/modules/address/routes'
import {addressSlice} from '@/modules/address/slice'
import {AddressState} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {createCoreModule} from '@/modules/utils/createModule'
import {ReduxKey} from '@/store/types/reduxKey'

const persistWhitelist: (keyof AddressState)[] = [
  'address',
  'locationType',
  'recentAddresses',
  'moduleCustomAddress',
  'moduleLocationType',
]

export const addressModule = createCoreModule({
  name: 'AddressModule',
  linking: {
    [AddressRouteName.address]: {
      path: `/${ModuleSlug.address}`,
    },
  },
  slug: ModuleSlug.address,
  reduxConfigs: [
    {
      key: ReduxKey.address,
      persistVersion: 0,
      slice: addressSlice,
      persistWhitelist,
    },
  ],
})
