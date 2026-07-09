import type {BoundingBox} from 'react-native-maps'

export const convertBoundingBoxToRegion = (boundaries: BoundingBox) => ({
  latitude: (boundaries.northEast.latitude + boundaries.southWest.latitude) / 2,
  longitude:
    (boundaries.northEast.longitude + boundaries.southWest.longitude) / 2,
  latitudeDelta: Math.abs(
    boundaries.northEast.latitude - boundaries.southWest.latitude,
  ),
  longitudeDelta: Math.abs(
    boundaries.northEast.longitude - boundaries.southWest.longitude,
  ),
})
