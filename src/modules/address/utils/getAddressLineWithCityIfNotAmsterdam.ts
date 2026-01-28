import {AddressCity, type Address} from '@/modules/address/types'

export const getAddressLineWithCityIfNotAmsterdam = (address?: Address) => {
  if (!address?.addressLine1) {
    return ''
  }

  const cityPart =
    address?.city && address.city !== AddressCity.Amsterdam
      ? ', ' + address?.city
      : ''

  return `${address.addressLine1}${cityPart}`
}
