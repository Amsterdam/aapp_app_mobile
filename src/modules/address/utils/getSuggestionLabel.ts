import {
  Address,
  AddressCity,
  BaseAddress,
} from '@/modules/address/exports/types'
import {getAddressLine1} from '@/modules/address/exports/utils/addDerivedAddressFields'

export const getSuggestionLabelForStreetOrAddress = (
  address: Address | BaseAddress,
): string => {
  const {street, type, city} = address

  if (type !== 'adres') {
    if (city === AddressCity.Amsterdam) {
      return street
    } else {
      return `${street}, ${city}`
    }
  }

  const streetAndHouseNumber = getAddressLine1(address)

  if (city === AddressCity.Amsterdam) {
    return streetAndHouseNumber
  } else {
    return `${streetAndHouseNumber}, ${city}`
  }
}

export const getSuggestionLabelForNumber = ({
  number,
  additionNumber,
  additionLetter,
}: Address) =>
  `${number}${additionLetter ?? ''}${
    additionNumber ? `-${additionNumber}` : ''
  }`

export const getSuggestionLabel = (
  address: BaseAddress | Address,
  numbersOnly: boolean,
) =>
  numbersOnly && address.type === 'adres'
    ? getSuggestionLabelForNumber(address)
    : getSuggestionLabelForStreetOrAddress(address)
