import {Address} from '@/modules/address/exports/types'
import {getBulkyWasteAppointmentUrl} from '@/modules/waste-guide/utils/getBulkyWasteAppointmentUrl'

describe('getBulkyWasteAppointmentUrl', () => {
  it('should be just the bulky waste url if no address', () => {
    expect(getBulkyWasteAppointmentUrl('https://url.com')).toBe(
      'https://url.com',
    )
  })
  it('should be the bulky waste url with query params if there is an address without addition', () => {
    expect(
      getBulkyWasteAppointmentUrl('https://url.com', {
        number: 1,
        postcode: '1234AB',
      } as unknown as Address),
    ).toBe('https://url.com?GUID=1234AB,1,,')
  })
  it('should be the bulky waste url with query params if there is an address with an addition letter', () => {
    expect(
      getBulkyWasteAppointmentUrl('https://url.com', {
        additionLetter: 'A',
        number: 1,
        postcode: '1234AB',
      } as unknown as Address),
    ).toBe('https://url.com?GUID=1234AB,1,A,')
  })
  it('should be the bulky waste url with query params if there is an address with an addition number', () => {
    expect(
      getBulkyWasteAppointmentUrl('https://url.com', {
        additionNumber: '2',
        number: 1,
        postcode: '1234AB',
      } as unknown as Address),
    ).toBe('https://url.com?GUID=1234AB,1,,2')
  })
})
