import {Address, AddressCity} from '@/modules/address/types'
import {
  getAddition,
  getAddressLine1,
  getAddressLine2,
  addDerivedAddressFields,
} from '@/modules/address/utils/addDerivedAddressFields'

describe('getAddition', () => {
  test('should return the correct addition when only bag_huisletter is provided', () => {
    expect(getAddition('B', '')).toBe('B')
  })
  test('should return the correct addition when only bag_toevoeging is provided', () => {
    expect(getAddition('', '3')).toBe('3')
  })
  test('should return the correct addition when both bag_huisletter and bag_toevoeging are provided', () => {
    expect(getAddition('B', '3')).toBe('B-3')
  })
  test('should return undefined when both bag_huisletter and bag_toevoeging are not provided', () => {
    expect(getAddition('', '')).toBeUndefined()
  })
})

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
    expect(getAddressLine2('1234AB', AddressCity.Amsterdam)).toBe(
      '1234 AB AMSTERDAM',
    )
    expect(getAddressLine2('5678CD', AddressCity.Weesp)).toBe('5678 CD WEESP')
    expect(getAddressLine2('5678 CD', AddressCity.Weesp)).toBe('5678 CD WEESP')
  })
  test('should undefined input', () => {
    // @ts-ignore
    expect(getAddressLine2('5678CD')).toBe('')
    // @ts-ignore
    expect(getAddressLine2(undefined, AddressCity.Weesp)).toBe('')
    // @ts-ignore
    expect(getAddressLine2()).toBe('')
  })
})

describe('addDerivedAddressFields', () => {
  test('should transform the address API response into the correct address format, with letter addition', () => {
    const addressApiResponse = {
      bagId: '0363200000132941',
      street: 'Hoofdweg',
      number: 123,
      additionLetter: 'A',
      city: 'Amsterdam',
      postcode: '1058BB',
      coordinates: {lat: 52.36303093, lon: 4.85284154},
      type: 'adres',
    } as Address
    const expectedAddress: Address = {
      bagId: '0363200000132941',
      street: 'Hoofdweg',
      addition: 'A',
      additionLetter: 'A',
      postcode: '1058BB',
      coordinates: {lat: 52.36303093, lon: 4.85284154},
      addressLine1: 'Hoofdweg 123A',
      addressLine2: '1058 BB AMSTERDAM',
      city: AddressCity.Amsterdam,
      number: 123,
      type: 'adres',
    }

    expect(addDerivedAddressFields(addressApiResponse)).toEqual(expectedAddress)
  })
  test('should transform the address API response into the correct address format, with number addition', () => {
    const addressApiResponse = {
      bagId: '0363200000132941',
      street: 'Hoofdweg',
      number: 123,
      additionNumber: '4',
      city: 'Amsterdam',
      postcode: '1058BB',
      coordinates: {lat: 52.36303093, lon: 4.85284154},
      type: 'adres',
    } as Address
    const expectedAddress: Address = {
      bagId: '0363200000132941',
      street: 'Hoofdweg',
      addition: '4',
      additionNumber: '4',
      postcode: '1058BB',
      coordinates: {lat: 52.36303093, lon: 4.85284154},
      addressLine1: 'Hoofdweg 123-4',
      addressLine2: '1058 BB AMSTERDAM',
      city: AddressCity.Amsterdam,
      number: 123,
      type: 'adres',
    }

    expect(addDerivedAddressFields(addressApiResponse)).toEqual(expectedAddress)
  })
  test('should transform the address API response into the correct address format, without number and letter addition', () => {
    const addressApiResponse = {
      bagId: '0363200000132941',
      street: 'Hoofdweg',
      number: 123,
      additionNumber: '4',
      additionLetter: 'A',
      city: 'Amsterdam',
      postcode: '1058BB',
      coordinates: {lat: 52.36303093, lon: 4.85284154},
      type: 'adres',
    } as Address
    const expectedAddress: Address = {
      bagId: '0363200000132941',
      street: 'Hoofdweg',
      addition: 'A-4',
      additionNumber: '4',
      additionLetter: 'A',
      postcode: '1058BB',
      coordinates: {lat: 52.36303093, lon: 4.85284154},
      addressLine1: 'Hoofdweg 123A-4',
      addressLine2: '1058 BB AMSTERDAM',
      city: AddressCity.Amsterdam,
      number: 123,
      type: 'adres',
    }

    expect(addDerivedAddressFields(addressApiResponse)).toEqual(expectedAddress)
  })
})
