import type {ParkingMachine} from '@/modules/parking/types'
import type {ServicePointFeature} from '@/modules/service/types'
import type {Coordinates} from '@/types/location'
import {type Address, AddressCity} from '@/modules/address/types'
import {sortByDistanceToAddress} from '@/utils/sortByDistanceToAddress'

describe('sortByDistanceToAddress', () => {
  const parkingMachines: ParkingMachine[] = [
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

  const servicePoints = [
    {
      id: '1',
      geometry: {coordinates: [52.5, 4], type: 'Point'},
      type: 'Feature',
      properties: {aapp_title: 'test_1'},
    },
    {
      id: '2',
      geometry: {coordinates: [52, 4], type: 'Point'},
      type: 'Feature',
      properties: {aapp_title: 'test_2'},
    },
    {
      id: '3',
      geometry: {coordinates: [53, 4], type: 'Point'},
      type: 'Feature',
      properties: {aapp_title: 'test_3'},
    },
  ].map(point => ({
    ...point,
    lat: point.geometry.coordinates[1],
    lon: point.geometry.coordinates[0],
  })) as (ServicePointFeature & Coordinates)[]

  const address: Address = {
    bagId: '',
    city: AddressCity.Amsterdam,
    number: 1,
    postcode: '',
    street: '',
    coordinates: {lat: 52.1, lon: 4},
  }

  it('returns original order if no address', () => {
    const sortedParkingMachines = sortByDistanceToAddress(parkingMachines)
    const sortedServicePoints = sortByDistanceToAddress(servicePoints)

    expect(sortedParkingMachines.map(s => s.id)).toEqual(['1', '2', '3'])
    expect(sortedServicePoints.map(s => s.id)).toEqual(['1', '2', '3'])
  })

  it('sorts by distance to address if coordinates present', () => {
    const sortedParkingMachines = sortByDistanceToAddress(
      parkingMachines,
      address,
    )

    expect(sortedParkingMachines[0].id).toBe('1')
    expect(sortedParkingMachines[1].id).toBe('3')
    expect(sortedParkingMachines[2].id).toBe('2')

    const sortedServicePoints = sortByDistanceToAddress(servicePoints, address)

    expect(sortedServicePoints[0].id).toBe('2')
    expect(sortedServicePoints[1].id).toBe('1')
    expect(sortedServicePoints[2].id).toBe('3')
  })

  it('returns original order if address has no coordinates', () => {
    const addrNoCoords = {...address, coordinates: undefined}
    const sorted = sortByDistanceToAddress(parkingMachines, addrNoCoords)

    expect(sorted.map(s => s.id)).toEqual(['1', '2', '3'])
  })
})
