import type {ModuleClientConfig} from '@/modules/types'
import {setLocationType} from '@/modules/address/slice'
import {ModuleSlug} from '@/modules/slugs'

export const onNotificationEvent: ModuleClientConfig['onNotificationEvent'] = (
  _type,
  _detail,
  _isPushNotificationDeeplink,
  dispatch,
) => {
  dispatch(
    setLocationType({
      locationType: 'address',
      moduleSlug: ModuleSlug['waste-guide'],
    }),
  )

  return '/afval/afvalinformatie/'
}
