import type {LatLng} from 'react-native-maps'
import {MAP_COORDINATES_LONGITUDE_CORRECTION_FOR_AMSTERDAM} from '@/components/features/map/line-string/constants'

export const getOffsetCoordinate = (
  coordinate: LatLng,
  angle: number,
  offset: number,
): LatLng => {
  const perpendicularAngle = angle + Math.PI / 2
  const longitudeOffset =
    Math.cos(perpendicularAngle) *
    offset *
    MAP_COORDINATES_LONGITUDE_CORRECTION_FOR_AMSTERDAM
  const latitudeOffset = Math.sin(perpendicularAngle) * offset

  return {
    latitude: coordinate.latitude + latitudeOffset,
    longitude: coordinate.longitude + longitudeOffset,
  }
}
