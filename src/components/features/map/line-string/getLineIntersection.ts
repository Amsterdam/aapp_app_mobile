import type {LatLng} from 'react-native-maps'

export const getLineIntersection = (
  firstCoordinate: LatLng,
  firstAngle: number,
  secondCoordinate: LatLng,
  secondAngle: number,
): LatLng | null => {
  const firstDirectionLongitude = Math.cos(firstAngle)
  const firstDirectionLatitude = Math.sin(firstAngle)
  const secondDirectionLongitude = Math.cos(secondAngle)
  const secondDirectionLatitude = Math.sin(secondAngle)

  const denominator =
    firstDirectionLongitude * secondDirectionLatitude -
    firstDirectionLatitude * secondDirectionLongitude

  if (Math.abs(denominator) < 1e-12) {
    return null
  }

  const deltaLongitude = secondCoordinate.longitude - firstCoordinate.longitude
  const deltaLatitude = secondCoordinate.latitude - firstCoordinate.latitude

  const firstScalar =
    (deltaLongitude * secondDirectionLatitude -
      deltaLatitude * secondDirectionLongitude) /
    denominator

  return {
    longitude:
      firstCoordinate.longitude + firstScalar * firstDirectionLongitude,
    latitude: firstCoordinate.latitude + firstScalar * firstDirectionLatitude,
  }
}
