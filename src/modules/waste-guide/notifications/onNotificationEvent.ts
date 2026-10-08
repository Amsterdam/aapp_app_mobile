import {setLocationType} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import type {ModuleClientConfig} from '@/modules/types'

export const onNotificationEvent: ModuleClientConfig['onNotificationEvent'] = (
  _notification,
  dispatch,
) => {
  dispatch(
    setLocationType({
      locationType: 'address',
      moduleSlug: ModuleSlug['waste-guide'],
    }),
  )
}
