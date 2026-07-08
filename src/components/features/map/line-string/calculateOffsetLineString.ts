import type {LatLng} from 'react-native-maps'
import {calculateAngle} from '@/components/features/map/line-string/calculateAngle'
import {getLineIntersection} from '@/components/features/map/line-string/getLineIntersection'
import {getOffsetCoordinate} from '@/components/features/map/line-string/getOffsetCoordinate'

export const calculateOffsetLineString = (
  coordinates: LatLng[],
  offset: number,
) => {
  if (coordinates.length < 2) {
    return coordinates
  }

  const result: LatLng[] = []
  const [startCoord, startNextCoord] = coordinates

  if (!startCoord || !startNextCoord) {
    return coordinates
  }

  const startAngle = calculateAngle(startNextCoord, startCoord)

  result.push(getOffsetCoordinate(startCoord, startAngle, offset))

  for (let i = 1; i < coordinates.length; i++) {
    const previous = coordinates[i - 1]
    const coord = coordinates[i]
    const nextCoord = coordinates[i + 1]

    if (nextCoord) {
      const previousAngle = calculateAngle(coord, previous)
      const angle = calculateAngle(nextCoord, coord)

      const previousCoordinate = getOffsetCoordinate(
        coord,
        previousAngle,
        offset,
      )
      const nextCoordinate = getOffsetCoordinate(coord, angle, offset)

      const intersectionCoordinate = getLineIntersection(
        previousCoordinate,
        previousAngle,
        nextCoordinate,
        angle,
      )

      result.push(
        intersectionCoordinate || {
          latitude: (previousCoordinate.latitude + nextCoordinate.latitude) / 2,
          longitude:
            (previousCoordinate.longitude + nextCoordinate.longitude) / 2,
        },
      )
    }
  }

  const endPreviousCoordinate = coordinates.at(-2)
  const endCoordinate = coordinates.at(-1)

  if (!endPreviousCoordinate || !endCoordinate) {
    return result
  }

  const endAngle = calculateAngle(endCoordinate, endPreviousCoordinate)

  result.push(getOffsetCoordinate(endCoordinate, endAngle, offset))

  return result
}
