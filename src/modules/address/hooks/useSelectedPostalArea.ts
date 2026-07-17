import {skipToken} from '@reduxjs/toolkit/query'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {useGetPostalAreaQuery} from '@/modules/address/service'
import {addressHasCoordinates} from '@/modules/address/utils/addressHasCoordinates'

export const useSelectedPostalArea = (moduleSlug: ModuleSlug) => {
  const {address, isFetching: isFetchingAddress} =
    useSelectedAddress(moduleSlug)

  const shouldGetPostalArea =
    addressHasCoordinates(address) && !address.postcode

  const {
    data,
    isError,
    isSuccess,
    isFetching: isFetchingPostalArea,
  } = useGetPostalAreaQuery(
    shouldGetPostalArea ? address.coordinates : skipToken,
  )

  if (shouldGetPostalArea) {
    return {
      postalArea: address?.postcode || data?.postal_area,
      isError: isError || (isSuccess && !data),
      isFetching: isFetchingAddress || isFetchingPostalArea,
    }
  }

  return {
    postalArea: address?.postcode,
    isError: false,
    isFetching: isFetchingAddress,
  }
}
