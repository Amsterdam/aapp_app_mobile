import type {ReduxDispatch} from '@/hooks/redux/types'
import type {Address} from '@/modules/address/types'
import {wasteGuideApi} from '@/modules/waste-guide/service'

export const onMyAddressChanged = (
  newAddress: Address | null,
  dispatch: ReduxDispatch,
): Promise<unknown> => {
  if (newAddress?.bagId) {
    return dispatch(
      wasteGuideApi.endpoints.getWasteGuideNotification.initiate(),
    ).then(response => {
      if ('data' in response && response.data?.status !== 'error') {
        void dispatch(
          wasteGuideApi.endpoints.postWasteGuideNotification.initiate(
            newAddress?.bagId,
          ),
        )
      }
    })
  } else {
    return dispatch(
      wasteGuideApi.endpoints.deleteWasteGuideNotification.initiate(),
    )
  }
}
