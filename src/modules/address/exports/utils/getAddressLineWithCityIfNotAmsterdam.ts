import {AddressCity, type Address} from '@/modules/address/exports/types'
import {getAddressLine1} from '@/modules/address/exports/utils/addDerivedAddressFields'

export const getAddressLineWithCityIfNotAmsterdam = (address?: Address) => {
  const addressLine1 = getAddressLine1(address)

  if (!addressLine1) {
    return ''
  }

  const cityPart =
    address?.city && address.city !== AddressCity.Amsterdam
      ? ', ' + address?.city
      : ''

  return `${addressLine1}${cityPart}`
}
