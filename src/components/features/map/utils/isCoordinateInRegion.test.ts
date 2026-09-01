import type {LatLng, Region} from 'react-native-maps'
import {isCoordinateInRegion} from '@/components/features/map/utils/isCoordinateInRegion'

const createCoordinate = (
  latitude: number | null | undefined,
  longitude: number | null | undefined,
): LatLng => ({latitude, longitude}) as LatLng

const createRegion = (
  latitude: number | null | undefined,
  longitude: number | null | undefined,
  latitudeDelta: number | null | undefined,
  longitudeDelta: number | null | undefined,
): Region =>
  ({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  }) as Region

describe('isCoordinateInRegion', () => {
  it('returns false when the region is undefined', () => {
    expect(isCoordinateInRegion(createCoordinate(52.37, 4.89), undefined)).toBe(
      false,
    )
  })

  it('returns false when coordinate latitude is undefined or null', () => {
    const region = createRegion(52.37, 4.89, 0.2, 0.2)

    expect(
      isCoordinateInRegion(createCoordinate(undefined, 4.89), region),
    ).toBe(false)
    expect(isCoordinateInRegion(createCoordinate(null, 4.89), region)).toBe(
      false,
    )
  })

  it('returns false when coordinate longitude is undefined or null', () => {
    const region = createRegion(52.37, 4.89, 0.2, 0.2)

    expect(
      isCoordinateInRegion(createCoordinate(52.37, undefined), region),
    ).toBe(false)
    expect(isCoordinateInRegion(createCoordinate(52.37, null), region)).toBe(
      false,
    )
  })

  it('returns false when region latitude is undefined or null', () => {
    const coordinate = createCoordinate(52.37, 4.89)

    expect(
      isCoordinateInRegion(coordinate, createRegion(undefined, 4.89, 0.2, 0.2)),
    ).toBe(false)
    expect(
      isCoordinateInRegion(coordinate, createRegion(null, 4.89, 0.2, 0.2)),
    ).toBe(false)
  })

  it('returns false when region longitude is undefined or null', () => {
    const coordinate = createCoordinate(52.37, 4.89)

    expect(
      isCoordinateInRegion(
        coordinate,
        createRegion(52.37, undefined, 0.2, 0.2),
      ),
    ).toBe(false)
    expect(
      isCoordinateInRegion(coordinate, createRegion(52.37, null, 0.2, 0.2)),
    ).toBe(false)
  })

  it('returns false when region latitudeDelta is undefined or null', () => {
    const coordinate = createCoordinate(52.37, 4.89)

    expect(
      isCoordinateInRegion(
        coordinate,
        createRegion(52.37, 4.89, undefined, 0.2),
      ),
    ).toBe(false)
    expect(
      isCoordinateInRegion(coordinate, createRegion(52.37, 4.89, null, 0.2)),
    ).toBe(false)
  })

  it('returns false when region longitudeDelta is undefined or null', () => {
    const coordinate = createCoordinate(52.37, 4.89)

    expect(
      isCoordinateInRegion(
        coordinate,
        createRegion(52.37, 4.89, 0.2, undefined),
      ),
    ).toBe(false)
    expect(
      isCoordinateInRegion(coordinate, createRegion(52.37, 4.89, 0.2, null)),
    ).toBe(false)
  })

  it('returns true when the coordinate is inside a typical valid region', () => {
    const coordinate = createCoordinate(52.375, 4.895)
    const region = createRegion(52.37, 4.89, 0.02, 0.02)

    expect(isCoordinateInRegion(coordinate, region)).toBe(true)
  })

  it('returns true when the coordinate lies exactly on the region boundary', () => {
    const region = createRegion(52.37, 4.89, 0.02, 0.02)
    const coordinate = createCoordinate(
      region.latitude + region.latitudeDelta / 2,
      region.longitude + region.longitudeDelta / 2,
    )

    expect(isCoordinateInRegion(coordinate, region)).toBe(true)
  })

  it('returns false when the coordinate is just outside the region', () => {
    const coordinate = createCoordinate(52.3801, 4.9001)
    const region = createRegion(52.37, 4.89, 0.02, 0.02)

    expect(isCoordinateInRegion(coordinate, region)).toBe(false)
  })

  it('returns true for a zero-delta region only when the coordinate matches exactly', () => {
    const region = createRegion(52.37, 4.89, 0, 0)

    expect(isCoordinateInRegion(createCoordinate(52.37, 4.89), region)).toBe(
      true,
    )
    expect(isCoordinateInRegion(createCoordinate(52.3701, 4.89), region)).toBe(
      false,
    )
  })

  it('handles negative coordinates correctly', () => {
    const coordinate = createCoordinate(-33.865, 151.209)
    const region = createRegion(-33.87, 151.21, 0.02, 0.02)

    expect(isCoordinateInRegion(coordinate, region)).toBe(true)
  })
})
