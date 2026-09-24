import type {ReduxDispatch} from '@/hooks/redux/types'
import {constructionWorkApi} from '@/modules/construction-work/service'
import {ConstructionWorkEndpointName} from '@/modules/construction-work/types/api'

export const unregister = async (dispatch: ReduxDispatch): Promise<boolean> =>
  await dispatch(
    constructionWorkApi.endpoints[
      ConstructionWorkEndpointName.unregister
    ].initiate(),
  )
    .unwrap()
    .then(
      () => true,
      () => false,
    )
