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
    const address: Pick<Address, 'street' | 'number' | 'city'> = {
      street: 'Damrak',
      number: 1,
      city: AddressCity.Amsterdam,
    }

    expect(getAddressLineWithCityIfNotAmsterdam(address as Address)).toBe(
      'Damrak 1',
    )
  })

  it('returns addressLine1 with city if city is not Amsterdam', () => {
    const address: Pick<Address, 'street' | 'number' | 'city'> = {
      street: 'Sleutelsteeg',
      number: 2,
      city: AddressCity.Weesp,
    }

    expect(getAddressLineWithCityIfNotAmsterdam(address as Address)).toBe(
      'Sleutelsteeg 2, Weesp',
    )
  })

  it('returns addressLine1 if city is missing', () => {
    const address: Pick<Address, 'street' | 'number'> = {
      street: 'Sleutelsteeg',
      number: 2,
    }

    expect(getAddressLineWithCityIfNotAmsterdam(address as Address)).toBe(
      'Sleutelsteeg 2',
    )
  })
})
