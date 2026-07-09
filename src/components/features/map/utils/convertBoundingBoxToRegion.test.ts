import type {BoundingBox} from 'react-native-maps'
import {convertBoundingBoxToRegion} from '@/components/features/map/utils/convertBoundingBoxToRegion'

const createBoundingBox = (
  northEastLatitude: number,
  northEastLongitude: number,
  southWestLatitude: number,
  southWestLongitude: number,
): BoundingBox => ({
  northEast: {latitude: northEastLatitude, longitude: northEastLongitude},
  southWest: {latitude: southWestLatitude, longitude: southWestLongitude},
})

describe('convertBoundingBoxToRegion', () => {
  it('returns the center and deltas for a typical valid bounding box', () => {
    const boundingBox = createBoundingBox(52.4, 4.95, 52.3, 4.8)

    const result = convertBoundingBoxToRegion(boundingBox)

    expect(result.latitude).toBeCloseTo(52.35)
    expect(result.longitude).toBeCloseTo(4.875)
    expect(result.latitudeDelta).toBeCloseTo(0.1)
    expect(result.longitudeDelta).toBeCloseTo(0.15)
  })

  it('returns zero deltas when both corners are the same point', () => {
    const boundingBox = createBoundingBox(52.37, 4.89, 52.37, 4.89)

    const result = convertBoundingBoxToRegion(boundingBox)

    expect(result).toEqual({
      latitude: 52.37,
      longitude: 4.89,
      latitudeDelta: 0,
      longitudeDelta: 0,
    })
  })

  it('handles negative coordinates and mixed hemispheres', () => {
    const boundingBox = createBoundingBox(10, -70, -20, -80)

    const result = convertBoundingBoxToRegion(boundingBox)

    expect(result).toEqual({
      latitude: -5,
      longitude: -75,
      latitudeDelta: 30,
      longitudeDelta: 10,
    })
  })

  it('uses absolute deltas when northEast values are smaller than southWest values', () => {
    const boundingBox = createBoundingBox(1, 2, 3, 4)

    const result = convertBoundingBoxToRegion(boundingBox)

    expect(result).toEqual({
      latitude: 2,
      longitude: 3,
      latitudeDelta: 2,
      longitudeDelta: 2,
    })
  })
})
