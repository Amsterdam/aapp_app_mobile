import {AddressCity, type Address} from '@/modules/address/types'
import {
  getAddressLine1,
  getAddressLine2,
} from '@/modules/address/utils/addDerivedAddressFields'

describe('getAddressLine1', () => {
  test('should format postcode and city into address line 2', () => {
    expect(
      getAddressLine1({
        additionLetter: 'A',
        number: 123,
        street: 'Hoofdweg',
      }),
    ).toBe('Hoofdweg 123A')
  })
  test('should undefined input', () => {
    // @ts-ignore
    expect(getAddressLine1({})).toBe('')
    // @ts-ignore
    expect(getAddressLine1(undefined)).toBe('')
    // @ts-ignore
    expect(getAddressLine1()).toBe('')
  })
})

describe('getAddressLine2', () => {
  test('should format postcode and city into address line 2', () => {
    expect(
      getAddressLine2({
        postcode: '1234AB',
        city: AddressCity.Amsterdam,
      } as Address),
    ).toBe('1234 AB Amsterdam')
    expect(
      getAddressLine2({postcode: '5678CD', city: AddressCity.Weesp} as Address),
    ).toBe('5678 CD Weesp')
    expect(
      getAddressLine2({
        postcode: '5678 CD',
        city: AddressCity.Weesp,
      } as Address),
    ).toBe('5678 CD Weesp')
  })
  test('should undefined input', () => {
    // @ts-ignore
    expect(getAddressLine2({postcode: '5678CD'} as Address)).toBe('')
    // @ts-ignore
    expect(getAddressLine2({city: AddressCity.Weesp} as Address)).toBe('')
    // @ts-ignore
    expect(getAddressLine2()).toBe('')
  })
})
