import type {LatLng} from 'react-native-maps'
import {calculateAngle} from '@/components/features/map/line-string/calculateAngle'

describe('calculateAngle', () => {
  it('should return 0 when end coordinate is directly east from start coordinate.', () => {
    const startCoordinate: LatLng = {latitude: 52.37, longitude: 4.89}
    const endCoordinate: LatLng = {latitude: 52.37, longitude: 5.89}

    const result = calculateAngle(startCoordinate, endCoordinate)

    expect(result).toBe(0)
  })

  it('should return PI / 2 when end coordinate is directly north from start coordinate.', () => {
    const startCoordinate: LatLng = {latitude: 52.37, longitude: 4.89}
    const endCoordinate: LatLng = {latitude: 53.37, longitude: 4.89}

    const result = calculateAngle(startCoordinate, endCoordinate)

    expect(result).toBe(Math.PI / 2)
  })

  it('should return -PI / 2 when end coordinate is directly south from start coordinate.', () => {
    const startCoordinate: LatLng = {latitude: 52.37, longitude: 4.89}
    const endCoordinate: LatLng = {latitude: 51.37, longitude: 4.89}

    const result = calculateAngle(startCoordinate, endCoordinate)

    expect(result).toBe(-Math.PI / 2)
  })

  it('should return PI when end coordinate is directly west from start coordinate.', () => {
    const startCoordinate: LatLng = {latitude: 52.37, longitude: 4.89}
    const endCoordinate: LatLng = {latitude: 52.37, longitude: 3.89}

    const result = calculateAngle(startCoordinate, endCoordinate)

    expect(result).toBe(Math.PI)
  })

  it('should return 0 when start coordinate and end coordinate are the same.', () => {
    const startCoordinate: LatLng = {latitude: 12.3, longitude: 45.6}
    const endCoordinate: LatLng = {latitude: 12.3, longitude: 45.6}

    const result = calculateAngle(startCoordinate, endCoordinate)

    expect(result).toBe(0)
  })

  it('should throw when start coordinate is null.', () => {
    const startCoordinate = null as unknown as LatLng
    const endCoordinate: LatLng = {latitude: 1, longitude: 1}

    expect(() => calculateAngle(startCoordinate, endCoordinate)).toThrow(
      TypeError,
    )
  })

  it('should throw when start coordinate is undefined.', () => {
    const startCoordinate = undefined as unknown as LatLng
    const endCoordinate: LatLng = {latitude: 1, longitude: 1}

    expect(() => calculateAngle(startCoordinate, endCoordinate)).toThrow(
      TypeError,
    )
  })

  it('should throw when end coordinate is null.', () => {
    const startCoordinate: LatLng = {latitude: 1, longitude: 1}
    const endCoordinate = null as unknown as LatLng

    expect(() => calculateAngle(startCoordinate, endCoordinate)).toThrow(
      TypeError,
    )
  })

  it('should throw when end coordinate is undefined.', () => {
    const startCoordinate: LatLng = {latitude: 1, longitude: 1}
    const endCoordinate = undefined as unknown as LatLng

    expect(() => calculateAngle(startCoordinate, endCoordinate)).toThrow(
      TypeError,
    )
  })
})
