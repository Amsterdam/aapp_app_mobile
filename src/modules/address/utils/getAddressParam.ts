import {Address} from '@/modules/address/types'
import {getAddressLine1} from '@/modules/address/utils/addDerivedAddressFields'

export const getAddressParam = (address?: Address) => {
  if (address?.coordinates) {
    return address.coordinates
  }

  if (getAddressLine1(address)) {
    return {address: getAddressLine1(address)}
  }

  return undefined
}
