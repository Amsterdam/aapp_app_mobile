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

  const latitudeMinimum = region.latitude - region.latitudeDelta / 2
  const latitudeMaximum = region.latitude + region.latitudeDelta / 2
  const longitudeMinimum = region.longitude - region.longitudeDelta / 2
  const longitudeMaximum = region.longitude + region.longitudeDelta / 2

  return (
    coordinate.latitude >= latitudeMinimum &&
    coordinate.latitude <= latitudeMaximum &&
    coordinate.longitude >= longitudeMinimum &&
    coordinate.longitude <= longitudeMaximum
  )
}
