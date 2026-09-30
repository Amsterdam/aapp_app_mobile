import {Address, type BaseAddress} from '@/modules/address/exports/types'
import {
  getSuggestionLabel,
  getSuggestionLabelForNumber,
  getSuggestionLabelForStreetOrAddress,
} from '@/modules/address/utils/getSuggestionLabel'

describe('getSuggestionLabelForStreet', () => {
  it('should return straatnaam when type is "weg" and woonplaatsnaam is "Amsterdam"', () => {
    const address = {
      street: 'Amstel',
      type: 'weg',
      city: 'Amsterdam',
    } as BaseAddress

    const result = getSuggestionLabelForStreetOrAddress(address)

    expect(result).toBe('Amstel')
  })

  it('should return "straatnaam, woonplaatsnaam" when type is "weg" and woonplaatsnaam is not "Amsterdam"', () => {
    const address = {
      street: 'Stationsplein',
      type: 'weg',
      city: 'Weesp',
    } as unknown as Address

    const result = getSuggestionLabelForStreetOrAddress(address)

    expect(result).toBe('Stationsplein, Weesp')
  })

  it('should return streetAndHouseNumber when type is not "weg" and woonplaatsnaam is "Amsterdam"', () => {
    const address = {
      number: 1,
      street: 'Amstel',
      type: 'adres',
      city: 'Amsterdam',
    } as unknown as Address

    const result = getSuggestionLabelForStreetOrAddress(address)

    expect(result).toBe('Amstel 1')
  })

  it('should return "streetAndHouseNumber, woonplaatsnaam" when type is not "weg" and woonplaatsnaam is not "Amsterdam"', () => {
    const pdokAddress = {
      number: 1,
      street: 'Stationsplein',
      type: 'adres',
      city: 'Weesp',
    } as unknown as Address

    const result = getSuggestionLabelForStreetOrAddress(pdokAddress)

    expect(result).toBe('Stationsplein 1, Weesp')
  })
})

describe('getSuggestionLabelForNumber', () => {
  it('should return the correct suggestion label for number with minimal fields', () => {
    const address = {
      number: 123,
    } as Address

    const result = getSuggestionLabelForNumber(address)

    expect(result).toBe('123')
  })

  it('should return the correct suggestion label for number with additions', () => {
    const address1 = {
      number: 123,
      additionLetter: 'A',
    } as Address
    const address2 = {
      number: 123,
      additionNumber: '4',
    } as Address

    const result1 = getSuggestionLabelForNumber(address1)
    const result2 = getSuggestionLabelForNumber(address2)

    expect(result1).toBe('123A')
    expect(result2).toBe('123-4')
  })
})

describe('getSuggestionLabel', () => {
  it('should call getSuggestionLabelForNumber when numbersOnly is true', () => {
    const address = {
      number: 123,
      type: 'adres',
    } as Address
    const numbersOnly = true

    const result = getSuggestionLabel(address, numbersOnly)

    expect(result).toBe('123')
  })

  it('should call getSuggestionLabelForStreet when numbersOnly is false', () => {
    const address = {
      street: 'Amstel',
      type: 'weg',
      city: 'Amsterdam',
    } as BaseAddress
    const numbersOnly = false

    const result = getSuggestionLabel(address, numbersOnly)

    expect(result).toBe('Amstel')
  })
})
