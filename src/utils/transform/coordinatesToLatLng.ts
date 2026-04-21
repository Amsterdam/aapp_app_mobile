import type {LatLng} from 'react-native-maps'

export type Position = number[]

type NestedPositions = Position | Position[] | Position[][] | Position[][][]

const flattenPositions = (coordinates: NestedPositions): Position[] => {
  if (!Array.isArray(coordinates) || coordinates.length === 0) {
    return []
  }

  if (typeof coordinates[0] === 'number') {
    return [coordinates as Position]
  }

  return (coordinates as Array<Position | Position[] | Position[][]>).flatMap(
    coordinate => flattenPositions(coordinate),
  )
}

export const coordinatesToLatLng = (coordinates: NestedPositions): LatLng[] =>
  flattenPositions(coordinates).map(([longitude, latitude]) => ({
    latitude,
    longitude,
  }))
