import type {LatLng, Region} from 'react-native-maps'
import {isFiniteNumber} from '@/utils/isFiniteNumber'

export const isCoordinateInRegion = (coordinate: LatLng, region?: Region) => {
  if (
    !region ||
    !isFiniteNumber(coordinate.latitude) ||
    !isFiniteNumber(coordinate.longitude) ||
    !isFiniteNumber(region.latitude) ||
    !isFiniteNumber(region.longitude) ||
    !isFiniteNumber(region.latitudeDelta) ||
    !isFiniteNumber(region.longitudeDelta)
  ) {
    return false
  }

  const latMin = region.latitude - region.latitudeDelta / 2
  const latMax = region.latitude + region.latitudeDelta / 2
  const lngMin = region.longitude - region.longitudeDelta / 2
  const lngMax = region.longitude + region.longitudeDelta / 2

  return (
    coordinate.latitude >= latMin &&
    coordinate.latitude <= latMax &&
    coordinate.longitude >= lngMin &&
    coordinate.longitude <= lngMax
  )
}
