import {skipToken} from '@reduxjs/toolkit/query'
import {useIsFocusedAndroid} from '@/hooks/useIsFocusedAndroid'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useGetWasteGuideQuery} from '@/modules/waste-guide/service'

export const useGetWasteGuide = () => {
  const {
    address,
    isFetching: isFetchingAddress,
    hasValidAddress,
  } = useSelectedAddress(ModuleSlug['waste-guide'])

  const isFocusedAndroid = useIsFocusedAndroid()

  const {
    data,
    error,
    isError: getWasteGuideIsError,
    isFetching: isFetchingWasteGuide,
  } = useGetWasteGuideQuery(
    // isFocusedOrNotAndroid: on Android we delay the request until the screen is in focus, to prevent a double content rendering issue
    address?.bagId && isFocusedAndroid ? address.bagId : skipToken,
  )

  return {
    address,
    error,
    getWasteGuideIsError,
    hasValidAddress,
    isFetchingWasteGuide,
    isFetchingAddress,
    isLoading: isFetchingWasteGuide || isFetchingAddress,
    wasteGuide: data,
  }
}
