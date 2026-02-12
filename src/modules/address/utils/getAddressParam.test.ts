import {AddressCity} from '@/modules/address/types'
import {getAddressParam} from '@/modules/address/utils/getAddressParam'

describe('getAddressParam', () => {
  test('should return an undefined address and no coordinates when address is not provided', () => {
    const result = getAddressParam()

    expect(result).toEqual(undefined)
  })
  test('should return address query arg with addresLine1 when coordinates are not provided', () => {
    const result = getAddressParam({
      bagId: '1234567890',
      city: AddressCity.Amsterdam,
      number: 123,
      postcode: '1234AB',
      street: 'Hoofdstraat',
    })

    expect(result).toEqual({address: 'Hoofdstraat 123'})
  })
  test('should return address query arg with coordinates when provided', () => {
    const result = getAddressParam({
      bagId: '1234567890',
      city: AddressCity.Amsterdam,
      coordinates: {
        lat: 52.37403,
        lon: 4.88969,
      },
      number: 123,
      postcode: '1234AB',
      street: 'Hoofdstraat',
    })

    expect(result).toEqual({
      lat: 52.37403,
      lon: 4.88969,
    })
  })
})
