import type {LatLng} from 'react-native-maps'
import {MAP_COORDINATES_LONGITUDE_CORRECTION_FOR_AMSTERDAM} from '@/components/features/map/line-string/constants'

// to correct for the different ratio between longitude and latitude around amsterdam

export const calculateAngle = (
  startCoordinate: LatLng,
  endCoordinate: LatLng,
): number => {
  const deltaLatitude = endCoordinate.latitude - startCoordinate.latitude
  const deltaLongitude =
    (endCoordinate.longitude - startCoordinate.longitude) /
    MAP_COORDINATES_LONGITUDE_CORRECTION_FOR_AMSTERDAM

  return Math.atan2(deltaLatitude, deltaLongitude)
}
