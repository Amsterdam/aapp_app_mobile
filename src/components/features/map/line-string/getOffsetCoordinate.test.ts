import type {LatLng} from 'react-native-maps'
import {getOffsetCoordinate} from '@/components/features/map/line-string/getOffsetCoordinate'

describe('getOffsetCoordinate', () => {
  it('should offset the coordinate to the north when angle is 0.', () => {
    const coordinate: LatLng = {latitude: 52.37, longitude: 4.89}

    const result = getOffsetCoordinate(coordinate, 0, 0.01)

    expect(result.latitude).toBeCloseTo(52.38)
    expect(result.longitude).toBeCloseTo(4.89)
  })

  it('should offset the coordinate to the west when angle is PI / 2.', () => {
    const coordinate: LatLng = {latitude: 52.37, longitude: 4.89}

    const result = getOffsetCoordinate(coordinate, Math.PI / 2, 0.01)

    expect(result.latitude).toBeCloseTo(52.37)
    expect(result.longitude).toBeCloseTo(4.87)
  })

  it('should return the original coordinate when offset is 0.', () => {
    const coordinate: LatLng = {latitude: 12.34, longitude: 56.78}

    const result = getOffsetCoordinate(coordinate, Math.PI / 3, 0)

    expect(result).toEqual(coordinate)
  })

  it('should offset in the opposite direction for a negative offset.', () => {
    const coordinate: LatLng = {latitude: 0, longitude: 0}

    const result = getOffsetCoordinate(coordinate, 0, -1)

    expect(result.latitude).toBeCloseTo(-1)
    expect(result.longitude).toBeCloseTo(0)
  })

  it('should throw when coordinate is null.', () => {
    const coordinate = null as unknown as LatLng

    expect(() => getOffsetCoordinate(coordinate, 0, 1)).toThrow(TypeError)
  })

  it('should throw when coordinate is undefined.', () => {
    const coordinate = undefined as unknown as LatLng

    expect(() => getOffsetCoordinate(coordinate, 0, 1)).toThrow(TypeError)
  })

  it('should treat null angle as 0.', () => {
    const coordinate: LatLng = {latitude: 10, longitude: 20}
    const angle = null as unknown as number

    const result = getOffsetCoordinate(coordinate, angle, 1)

    expect(result.latitude).toBeCloseTo(11)
    expect(result.longitude).toBeCloseTo(20)
  })

  it('should return NaN values when angle is undefined.', () => {
    const coordinate: LatLng = {latitude: 10, longitude: 20}
    const angle = undefined as unknown as number

    const result = getOffsetCoordinate(coordinate, angle, 1)

    expect(result.latitude).toBeNaN()
    expect(result.longitude).toBeNaN()
  })

  it('should treat null offset as 0.', () => {
    const coordinate: LatLng = {latitude: 10, longitude: 20}
    const offset = null as unknown as number

    const result = getOffsetCoordinate(coordinate, 0, offset)

    expect(result).toEqual(coordinate)
  })

  it('should return NaN values when offset is undefined.', () => {
    const coordinate: LatLng = {latitude: 10, longitude: 20}
    const offset = undefined as unknown as number

    const result = getOffsetCoordinate(coordinate, 0, offset)

    expect(result.latitude).toBeNaN()
    expect(result.longitude).toBeNaN()
  })
})
