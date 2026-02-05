import {Address, AddressCity} from '@/modules/address/types'

export const getAddition = (
  additionLetter?: string,
  additionNumber?: string,
): string | undefined => {
  if (!additionLetter && !additionNumber) {
    return
  }

  if (!additionLetter && additionNumber) {
    return additionNumber
  }

  return `${additionLetter ?? ''}${additionNumber ? '-' + additionNumber : ''}`
}

export const getAddressLine1 = (
  address: Pick<
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

export const getAddressLine2 = (postcode: string, city: AddressCity) => {
  if (!postcode || !city) {
    return ''
  }

  return `${postcode.slice(0, 4)} ${postcode.slice(4).trim()} ${city}`
}

export const addDerivedAddressFields = (address: Address): Address => {
  const {postcode, city, additionLetter, additionNumber} = address

  return {
    ...address,
    addition: getAddition(additionLetter, additionNumber),
    addressLine1: getAddressLine1(address),
    addressLine2: getAddressLine2(postcode, city),
  }
}
