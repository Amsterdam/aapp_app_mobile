import type {ReduxDispatch} from '@/hooks/redux/types'
import type {Address} from '@/modules/address/types'
import {addressApi} from '@/modules/address/service'
import {burningGuideApi} from '@/modules/burning-guide/service'

export const onMyAddressChanged = async (
  newAddress: Address | null,
  dispatch: ReduxDispatch,
): Promise<unknown> => {
  if (newAddress?.postcode || newAddress?.coordinates) {
    let postalArea: string

    if (newAddress.postcode) {
      postalArea = newAddress.postcode.slice(0, 4)
    } else {
      const postalAreaResult = await dispatch(
        addressApi.endpoints.getPostalArea.initiate(newAddress.coordinates!),
      )

      if ('data' in postalAreaResult && postalAreaResult.data) {
        postalArea = postalAreaResult.data.postal_area
      }
    }

    return dispatch(
      burningGuideApi.endpoints.getBurningGuideNotification.initiate(),
    ).then(response => {
      if ('data' in response && response.data?.status !== 'error') {
        return dispatch(
          burningGuideApi.endpoints.postBurningGuideNotification.initiate(
            postalArea,
          ),
        )
      }

      return undefined
    })
  } else {
    return dispatch(
      burningGuideApi.endpoints.deleteBurningGuideNotification.initiate(),
    )
  }
}
