import type {ParkingMachine} from '@/modules/parking/types'
import {Address, AddressCity} from '@/modules/address/types'
import {getSortedParkingMachines} from '@/modules/parking/utils/getSortedParkingMachines'

describe('getSortedParkingMachines', () => {
  const stations: ParkingMachine[] = [
    {
      id: '1',
      name: 'A',
      lat: 52,
      lon: 4,
      start_date: '',
      payment_area: '',
    },
    {
      id: '2',
      name: 'B',
      lat: 53,
      lon: 4,
      start_date: '',
      payment_area: '',
    },
    {
      id: '3',
      name: 'C',
      lat: 52.5,
      lon: 4,
      start_date: '',
      payment_area: '',
    },
  ]

  const address: Address = {
    bagId: '',
    city: AddressCity.Amsterdam,
    number: 1,
    postcode: '',
    street: '',
    coordinates: {lat: 52.1, lon: 4},
  }

  it('returns original order if no address', () => {
    const sorted = getSortedParkingMachines(stations)

    expect(sorted.map(s => s.id)).toEqual(['1', '2', '3'])
  })

  it('sorts by distance to address if coordinates present', () => {
    const sorted = getSortedParkingMachines(stations, address)

    // Station 1 (52.0), then 3 (52.5), then 2 (53.0) relative to 52.1
    expect(sorted[0].id).toBe('1')
    expect(sorted[1].id).toBe('3')
    expect(sorted[2].id).toBe('2')
  })

  it('returns original order if address has no coordinates', () => {
    const addrNoCoords = {...address, coordinates: undefined}
    const sorted = getSortedParkingMachines(stations, addrNoCoords)

    expect(sorted.map(s => s.id)).toEqual(['1', '2', '3'])
  })
})
