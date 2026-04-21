import type {LatLng} from 'react-native-maps'

export type Position = number[]

export const coordinatesToLatLng = (
  coordinates: Position | Position[] | Position[][] | Position[][][],
): LatLng[] =>
  (Array.isArray(coordinates[0])
    ? (coordinates as Position[])
    : [coordinates as Position]
  ).map(([longitude, latitude]) => ({latitude, longitude}))
