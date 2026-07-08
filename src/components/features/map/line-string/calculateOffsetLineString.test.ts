import type {LatLng} from 'react-native-maps'
import {calculateOffsetLineString} from '@/components/features/map/line-string/calculateOffsetLineString'

describe('calculateOffsetLineString', () => {
  it('should return the same array when coordinates are empty.', () => {
    const coordinates: LatLng[] = []

    const result = calculateOffsetLineString(coordinates, 0.1)

    expect(result).toBe(coordinates)
    expect(result).toEqual([])
  })

  it('should return the same array when coordinates contain a single point.', () => {
    const coordinates: LatLng[] = [{latitude: 52.37, longitude: 4.89}]

    const result = calculateOffsetLineString(coordinates, 0.1)

    expect(result).toBe(coordinates)
    expect(result).toEqual([{latitude: 52.37, longitude: 4.89}])
  })

  it('should offset both points for a two-point line string.', () => {
    const coordinates: LatLng[] = [
      {latitude: 0, longitude: 0},
      {latitude: 1, longitude: 0},
    ]

    const result = calculateOffsetLineString(coordinates, 0.1)

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({latitude: 0, longitude: 0.1})
    expect(result[1]).toEqual({latitude: 1, longitude: 0.1})
  })

  it('should calculate an interior intersection for a bent three-point line string.', () => {
    const coordinates: LatLng[] = [
      {latitude: 0, longitude: 0},
      {latitude: 1, longitude: 0},
      {latitude: 1, longitude: 1},
    ]

    const result = calculateOffsetLineString(coordinates, 0.1)

    expect(result).toHaveLength(3)
    expect(result[0].latitude).toBeCloseTo(0)
    expect(result[0].longitude).toBeCloseTo(0.1)
    expect(result[1].latitude).toBeCloseTo(0.9)
    expect(result[1].longitude).toBeCloseTo(0.1)
    expect(result[2].latitude).toBeCloseTo(0.9)
    expect(result[2].longitude).toBeCloseTo(1)
  })

  it('should fallback to averaging when offset lines are parallel and do not intersect.', () => {
    const coordinates: LatLng[] = [
      {latitude: 1, longitude: 0},
      {latitude: 1, longitude: 1},
      {latitude: 1, longitude: 0},
    ]

    const result = calculateOffsetLineString(coordinates, 0.1)

    expect(result).toHaveLength(3)
    expect(result[0].latitude).toBeCloseTo(0.9)
    expect(result[0].longitude).toBeCloseTo(0)
    expect(result[1].latitude).toBeCloseTo(1)
    expect(result[1].longitude).toBeCloseTo(1)
    expect(result[2].latitude).toBeCloseTo(1.1)
    expect(result[2].longitude).toBeCloseTo(0)
  })

  it('should return the original coordinates when first coordinate is null.', () => {
    const coordinates = [
      null,
      {latitude: 1, longitude: 1},
    ] as unknown as LatLng[]

    const result = calculateOffsetLineString(coordinates, 0.1)

    expect(result).toBe(coordinates)
  })

  it('should return the original coordinates when second coordinate is undefined.', () => {
    const coordinates = [
      {latitude: 1, longitude: 1},
      undefined,
    ] as unknown as LatLng[]

    const result = calculateOffsetLineString(coordinates, 0.1)

    expect(result).toBe(coordinates)
  })

  it('should throw when coordinates is null.', () => {
    const coordinates = null as unknown as LatLng[]

    expect(() => calculateOffsetLineString(coordinates, 0.1)).toThrow(TypeError)
  })

  it('should throw when coordinates is undefined.', () => {
    const coordinates = undefined as unknown as LatLng[]

    expect(() => calculateOffsetLineString(coordinates, 0.1)).toThrow(TypeError)
  })

  it('should treat null offset as 0.', () => {
    const coordinates: LatLng[] = [
      {latitude: 0, longitude: 0},
      {latitude: 1, longitude: 0},
    ]
    const offset = null as unknown as number

    const result = calculateOffsetLineString(coordinates, offset)

    expect(result).toEqual(coordinates)
  })

  it('should return NaN coordinates when offset is undefined.', () => {
    const coordinates: LatLng[] = [
      {latitude: 0, longitude: 0},
      {latitude: 1, longitude: 0},
    ]
    const offset = undefined as unknown as number

    const result = calculateOffsetLineString(coordinates, offset)

    expect(result).toHaveLength(2)
    expect(result[0].latitude).toBeNaN()
    expect(result[0].longitude).toBeNaN()
    expect(result[1].latitude).toBeNaN()
    expect(result[1].longitude).toBeNaN()
  })
})
