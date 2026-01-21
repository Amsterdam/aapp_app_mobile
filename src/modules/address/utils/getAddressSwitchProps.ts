import type {Address, LocationType} from '@/modules/address/types'
import {accessibleText} from '@/utils/accessibility/accessibleText'

export const getAddressSwitchIcon = (
  locationType?: LocationType,
  address?: Address,
  isFetchingLocation: boolean = false,
) => {
  if (locationType === 'address' && address) {
    return 'housing'
  }

  if (locationType === 'location') {
    if (address?.addressLine1) {
      return 'mapLocationIosFilled'
    } else if (isFetchingLocation) {
      return 'spinner'
    }
  }

  return 'location'
}

export const getAddressSwitchLabel = (
  locationType?: LocationType,
  address?: Address,
  isFetching?: boolean,
) => {
  if (locationType === 'location' && isFetching) {
    return 'Mijn huidige locatie'
  }

  if (address?.addressLine1) {
    return address.addressLine1
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
  isFetching?: boolean,
) =>
  accessibleText(
    getAddressSwitchLabel(locationType, address, isFetching),
    address ? getLocationTypeLabel(locationType) : '',
    'Druk om adres te wijzigen.',
  )
