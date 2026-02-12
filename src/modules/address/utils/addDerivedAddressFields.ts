import {Address} from '@/modules/address/types'

/**
 * Formats the address fields into:
 * Street, number, addition letter and addition number (if available)
 */
export const getAddressLine1 = (
  address?: Pick<
    Address,
    'street' | 'number' | 'additionLetter' | 'additionNumber'
  >,
) => {
  if (address?.street && address?.number) {
    return `${address.street} ${address.number}${
      address.additionLetter ?? ''
    }${address.additionNumber ? '-' + address.additionNumber : ''}`
  } else {
    return ''
  }
}

/**
 * Formats the address fields into:
 * Postcode and city
 */
export const getAddressLine2 = (
  address?: Pick<Address, 'postcode' | 'city'>,
) => {
  const {postcode, city} = address ?? {}

  if (!postcode || !city) {
    return ''
  }

  return `${postcode.slice(0, 4)} ${postcode.slice(4).trim()} ${city}`
}
