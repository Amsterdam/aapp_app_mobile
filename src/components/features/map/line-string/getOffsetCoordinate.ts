import type {LatLng} from 'react-native-maps'

export const getOffsetCoordinate = (
  coordinate: LatLng,
  angle: number,
  offset: number,
): LatLng => {
  const perpendicularAngle = angle + Math.PI / 2
  const longitudeOffset = Math.cos(perpendicularAngle) * offset
  const latitudeOffset = Math.sin(perpendicularAngle) * offset

  return {
    latitude: coordinate.latitude + latitudeOffset,
    longitude: coordinate.longitude + longitudeOffset,
  }
}
