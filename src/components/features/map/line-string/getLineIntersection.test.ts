import type {LatLng} from 'react-native-maps'
import {getLineIntersection} from '@/components/features/map/line-string/getLineIntersection'

describe('getLineIntersection', () => {
  it('should return the intersection for perpendicular lines.', () => {
    const firstCoordinate: LatLng = {latitude: 0, longitude: 0}
    const secondCoordinate: LatLng = {latitude: 1, longitude: 1}

    const result = getLineIntersection(
      firstCoordinate,
      0,
      secondCoordinate,
      -Math.PI / 2,
    )

    expect(result).toEqual({latitude: 0, longitude: 1})
  })

  it('should return the shared point when both lines start at the same coordinate.', () => {
    const firstCoordinate: LatLng = {latitude: 2, longitude: 3}
    const secondCoordinate: LatLng = {latitude: 2, longitude: 3}

    const result = getLineIntersection(
      firstCoordinate,
      Math.PI / 4,
      secondCoordinate,
      -Math.PI / 4,
    )

    expect(result).toEqual({latitude: 2, longitude: 3})
  })

  it('should return null for parallel lines.', () => {
    const firstCoordinate: LatLng = {latitude: 0, longitude: 0}
    const secondCoordinate: LatLng = {latitude: 1, longitude: 1}

    const result = getLineIntersection(firstCoordinate, 0, secondCoordinate, 0)

    expect(result).toBeNull()
  })

  it('should return null for anti-parallel lines.', () => {
    const firstCoordinate: LatLng = {latitude: 0, longitude: 0}
    const secondCoordinate: LatLng = {latitude: 1, longitude: 1}

    const result = getLineIntersection(
      firstCoordinate,
      0,
      secondCoordinate,
      Math.PI,
    )

    expect(result).toBeNull()
  })

  it('should throw when first coordinate is null.', () => {
    const firstCoordinate = null as unknown as LatLng
    const secondCoordinate: LatLng = {latitude: 1, longitude: 1}

    expect(() =>
      getLineIntersection(firstCoordinate, 0, secondCoordinate, Math.PI / 2),
    ).toThrow(TypeError)
  })

  it('should throw when first coordinate is undefined.', () => {
    const firstCoordinate = undefined as unknown as LatLng
    const secondCoordinate: LatLng = {latitude: 1, longitude: 1}

    expect(() =>
      getLineIntersection(firstCoordinate, 0, secondCoordinate, Math.PI / 2),
    ).toThrow(TypeError)
  })

  it('should treat null first angle as 0.', () => {
    const firstCoordinate: LatLng = {latitude: 0, longitude: 0}
    const firstAngle = null as unknown as number
    const secondCoordinate: LatLng = {latitude: 1, longitude: 1}

    const result = getLineIntersection(
      firstCoordinate,
      firstAngle,
      secondCoordinate,
      -Math.PI / 2,
    )

    expect(result).toEqual({latitude: 0, longitude: 1})
  })

  it('should return NaN values when first angle is undefined.', () => {
    const firstCoordinate: LatLng = {latitude: 0, longitude: 0}
    const firstAngle = undefined as unknown as number
    const secondCoordinate: LatLng = {latitude: 1, longitude: 1}

    const result = getLineIntersection(
      firstCoordinate,
      firstAngle,
      secondCoordinate,
      -Math.PI / 2,
    )

    expect(result?.latitude).toBeNaN()
    expect(result?.longitude).toBeNaN()
  })

  it('should throw when second coordinate is null.', () => {
    const firstCoordinate: LatLng = {latitude: 0, longitude: 0}
    const secondCoordinate = null as unknown as LatLng

    expect(() =>
      getLineIntersection(firstCoordinate, 0, secondCoordinate, Math.PI / 2),
    ).toThrow(TypeError)
  })

  it('should throw when second coordinate is undefined.', () => {
    const firstCoordinate: LatLng = {latitude: 0, longitude: 0}
    const secondCoordinate = undefined as unknown as LatLng

    expect(() =>
      getLineIntersection(firstCoordinate, 0, secondCoordinate, Math.PI / 2),
    ).toThrow(TypeError)
  })

  it('should treat null second angle as 0 and return null for parallel lines.', () => {
    const firstCoordinate: LatLng = {latitude: 0, longitude: 0}
    const secondCoordinate: LatLng = {latitude: 1, longitude: 1}
    const secondAngle = null as unknown as number

    const result = getLineIntersection(
      firstCoordinate,
      0,
      secondCoordinate,
      secondAngle,
    )

    expect(result).toBeNull()
  })

  it('should return NaN values when second angle is undefined.', () => {
    const firstCoordinate: LatLng = {latitude: 0, longitude: 0}
    const secondCoordinate: LatLng = {latitude: 1, longitude: 1}
    const secondAngle = undefined as unknown as number

    const result = getLineIntersection(
      firstCoordinate,
      0,
      secondCoordinate,
      secondAngle,
    )

    expect(result?.latitude).toBeNaN()
    expect(result?.longitude).toBeNaN()
  })
})
