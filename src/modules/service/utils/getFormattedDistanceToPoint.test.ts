import type {Address, Coordinates} from '@/modules/address/types'
import {getFormattedDistanceToPoint} from '@/modules/service/utils/getFormattedDistanceToPoint'

describe('getFormattedDistanceToPoint', () => {
  const address: Partial<Address> = {
    coordinates: {lat: 52, lon: 4},
  }

  it('should return distance in meters string if distance between points is less than 1000 meters', () => {
    const point = {
      lat: 52.0001,
      lon: 4,
    }

    expect(
      getFormattedDistanceToPoint(address.coordinates as Coordinates, point),
    ).toBe('11 meter')
  })

  it('should return distance in km string if distance between points is more than 1000 meters', () => {
    const point = {
      lat: 52.01,
      lon: 4,
    }

    expect(
      getFormattedDistanceToPoint(address.coordinates as Coordinates, point),
    ).toBe('1.1 km')
  })

  it('should return 0 meter string if distance between points is 0', () => {
    const point = address.coordinates

    expect(
      getFormattedDistanceToPoint(
        address.coordinates as Coordinates,
        point as Coordinates,
      ),
    ).toBe('0 meter')
  })

  it('should return undefined if one or both of the points is/are undefined', () => {
    expect(
      getFormattedDistanceToPoint(
        address.coordinates as Coordinates,
        undefined,
      ),
    ).toBeUndefined()

    expect(
      getFormattedDistanceToPoint(undefined, address.coordinates),
    ).toBeUndefined()

    expect(getFormattedDistanceToPoint(undefined, undefined)).toBeUndefined()
  })
})
