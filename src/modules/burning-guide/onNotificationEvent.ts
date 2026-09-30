import type {ModuleClientConfig} from '@/modules/types'
import {setLocationType} from '@/modules/address/exports/state'
import {ModuleSlug} from '@/modules/generated/slugs.generated'

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
