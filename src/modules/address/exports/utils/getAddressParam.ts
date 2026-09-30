import {Address} from '@/modules/address/exports/types'
import {getAddressLine1} from '@/modules/address/exports/utils/addDerivedAddressFields'

export const getAddressParam = (address?: Address) => {
  if (address?.coordinates) {
    return address.coordinates
  }

  if (getAddressLine1(address)) {
    return {address: getAddressLine1(address)}
  }

  return undefined
}
