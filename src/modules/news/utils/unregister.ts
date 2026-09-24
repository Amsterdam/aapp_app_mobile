import type {ReduxDispatch} from '@/hooks/redux/types'
import {newsApi} from '@/modules/news/service'
import {NewsEndpointName} from '@/modules/news/types'

export const unregister = async (dispatch: ReduxDispatch): Promise<boolean> =>
  await dispatch(newsApi.endpoints[NewsEndpointName.unregister].initiate())
    .unwrap()
    .then(
      () => true,
      () => false,
    )
