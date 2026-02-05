import type {IconProps} from '@/components/ui/media/Icon'
import {type Address, type LocationType} from '@/modules/address/types'
import {getAddressLineWithCityIfNotAmsterdam} from '@/modules/address/utils/getAddressLineWithCityIfNotAmsterdam'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export const getAddressSwitchIcon = (
  locationType?: LocationType,
  address?: Address,
  isFetchingLocation: boolean = false,
): IconProps => {
  if (locationType === 'address' && address) {
    return {name: 'house'}
  }

  if (locationType === 'location') {
    if (address?.addressLine1) {
      return {isFilled: true, name: 'gps-ios'}
    } else if (isFetchingLocation) {
      return {name: 'spinner'}
    }
  }

  return {name: 'map-marker'}
}

export const getAddressSwitchLabel = (
  locationType?: LocationType,
  address?: Address,
  isFetching = false,
) => {
  if (locationType === 'location' && isFetching) {
    return 'Mijn huidige locatie'
  }

  if (address?.addressLine1) {
    return getAddressLineWithCityIfNotAmsterdam(address)
  }

  return 'Adres invullen'
}

export const getLocationTypeLabel = (locationType?: LocationType) => {
  switch (locationType) {
    case 'address':
      return 'Mijn adres'
    case 'custom':
      return ''
    case 'location':
      return 'Adres bij uw huidige locatie'
    default:
      return ''
  }
}

export const getAddressSwitchAccessibilityLabel = (
  locationType?: LocationType,
  address?: Address,
  isFetching = false,
) =>
  accessibleText(
    getAddressSwitchLabel(locationType, address, isFetching),
    address ? getLocationTypeLabel(locationType) : '',
    'Druk om adres te wijzigen.',
  )
