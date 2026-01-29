import {AddressCity, type Address} from '@/modules/address/types'
import {getAddressLineWithCityIfNotAmsterdam} from '@/modules/address/utils/getAddressLineWithCityIfNotAmsterdam'

describe('getAddressLineWithCityIfNotAmsterdam', () => {
  it('returns empty string if address is undefined', () => {
    expect(getAddressLineWithCityIfNotAmsterdam()).toBe('')
  })

  it('returns empty string if addressLine1 is missing', () => {
    const address = {city: AddressCity.Amsterdam} as Address

    expect(getAddressLineWithCityIfNotAmsterdam(address)).toBe('')
  })

  it('returns addressLine1 if city is Amsterdam', () => {
    const address = {
      addressLine1: 'Damrak 1',
      city: AddressCity.Amsterdam,
    } as Address

    expect(getAddressLineWithCityIfNotAmsterdam(address)).toBe('Damrak 1')
  })

  it('returns addressLine1 with city if city is not Amsterdam', () => {
    const address = {
      addressLine1: 'Sleutelsteeg 2',
      city: AddressCity.Weesp,
    } as Address

    expect(getAddressLineWithCityIfNotAmsterdam(address)).toBe(
      'Sleutelsteeg 2, Weesp',
    )
  })

  it('returns addressLine1 if city is missing', () => {
    const address = {addressLine1: 'Sleutelsteeg 2'} as Address

    expect(getAddressLineWithCityIfNotAmsterdam(address)).toBe('Sleutelsteeg 2')
  })
})
