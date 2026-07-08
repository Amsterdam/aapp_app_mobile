import type {LatLng} from 'react-native-maps'

// to correct for the different ratio between longitude and latitude around amsterdam
const mapCoordinatesCorrectionForAmsterdam = 2.7

export const calculateAngle = (
  startCoordinate: LatLng,
  endCoordinate: LatLng,
): number => {
  const deltaLatitude = endCoordinate.latitude - startCoordinate.latitude
  const deltaLongitude =
    (endCoordinate.longitude - startCoordinate.longitude) /
    mapCoordinatesCorrectionForAmsterdam

  return Math.atan2(deltaLatitude, deltaLongitude)
}
