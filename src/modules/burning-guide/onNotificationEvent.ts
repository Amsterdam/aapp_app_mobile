import type {ModuleClientConfig} from '@/modules/types'
import {setLocationType} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'

export const onNotificationEvent: ModuleClientConfig['onNotificationEvent'] = (
  _notification,
  dispatch,
) => {
  dispatch(
    setLocationType({
      locationType: 'address',
      moduleSlug: ModuleSlug['burning-guide'],
    }),
  )
}
