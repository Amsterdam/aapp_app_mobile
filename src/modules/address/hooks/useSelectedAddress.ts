import type {ModuleSlug} from '@/modules/slugs'
import {useSelector} from '@/hooks/redux/useSelector'
import {
  selectMyAddress,
  selectIsGettingLocation,
  selectLocation,
  selectLocationType,
  selectCustomAddress,
} from '@/modules/address/slice'

/**
 * Return either the user profile address or the address for their last known location, depending on the location type that is set for the module that matches the slug.
 * The address for location is a query request response. If the locationType for the module is 'location', the isError and isFetching properties will be set to be able handle loading/error states.
 */
export const useSelectedAddress = (moduleSlug: ModuleSlug) => {
  const locationType = useSelector(selectLocationType(moduleSlug))
  const address = useSelector(selectMyAddress)
  const customAddress = useSelector(selectCustomAddress(moduleSlug))
  const locationAddress = useSelector(selectLocation)
  const isGettingLocation = useSelector(selectIsGettingLocation)
  const resultAddress =
    locationType === 'location'
      ? locationAddress
      : locationType === 'custom'
        ? customAddress
        : address

  return {
    address: resultAddress,
    hasValidAddress: !!resultAddress,
    isFetching: locationType === 'location' && isGettingLocation,
    locationType,
    shouldShowSaveAsMyAddress:
      locationType === 'custom' &&
      !address &&
      customAddress &&
      !customAddress.showSaveAsMyAddress,
  }
}
