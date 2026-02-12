import {Address, AddressCity} from '@/modules/address/types'
import {PollingStation} from '@/modules/elections/types'
import {getSortedPollingStations} from '@/modules/elections/utils/getSortedPollingStations'

describe('getSortedPollingStations', () => {
  const stations: PollingStation[] = [
    {
      id: 1,
      name: 'A',
      address1: '',
      address2: '',
      categories: [],
      isOpen: true,
      lastUpdate: {state: 0, time: null},
      numbers: [],
      openingTimes: [],
      position: {lat: 52.0, lng: 4.0},
    },
    {
      id: 2,
      name: 'B',
      address1: '',
      address2: '',
      categories: [],
      isOpen: true,
      lastUpdate: {state: 0, time: null},
      numbers: [],
      openingTimes: [],
      position: {lat: 53.0, lng: 4.0},
    },
    {
      id: 3,
      name: 'C',
      address1: '',
      address2: '',
      categories: [],
      isOpen: true,
      lastUpdate: {state: 0, time: null},
      numbers: [],
      openingTimes: [],
      position: {lat: 52.5, lng: 4.0},
    },
  ]

  const address: Address = {
    bagId: '',
    city: AddressCity.Amsterdam,
    number: 1,
    postcode: '',
    street: '',
    coordinates: {lat: 52.1, lon: 4.0},
  }

  it('returns original order if no address', () => {
    const sorted = getSortedPollingStations(stations)

    expect(sorted.map(s => s.id)).toEqual([1, 2, 3])
  })

  it('sorts by distance to address if coordinates present', () => {
    const sorted = getSortedPollingStations(stations, address)

    // Station 1 (52.0), then 3 (52.5), then 2 (53.0) relative to 52.1
    expect(sorted[0].id).toBe(1)
    expect(sorted[1].id).toBe(3)
    expect(sorted[2].id).toBe(2)
  })

  it('returns original order if address has no coordinates', () => {
    const addrNoCoords = {...address, coordinates: undefined}
    const sorted = getSortedPollingStations(stations, addrNoCoords)

    expect(sorted.map(s => s.id)).toEqual([1, 2, 3])
  })
})
