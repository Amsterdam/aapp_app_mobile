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
  const [startCoordinate, startNextCoordinate] = coordinates

  if (!startCoordinate || !startNextCoordinate) {
    return coordinates
  }

  const startAngle = calculateAngle(startNextCoordinate, startCoordinate)

  result.push(getOffsetCoordinate(startCoordinate, startAngle, offset))

  for (let i = 1; i < coordinates.length; i++) {
    const previousCoordinate = coordinates[i - 1]
    const coordinate = coordinates[i]
    const nextCoordinate = coordinates[i + 1]

    if (nextCoordinate) {
      const previousAngle = calculateAngle(coordinate, previousCoordinate)
      const angle = calculateAngle(nextCoordinate, coordinate)

      const previousEndCoordinate = getOffsetCoordinate(
        coordinate,
        previousAngle,
        offset,
      )
      const nextStartCoordinate = getOffsetCoordinate(coordinate, angle, offset)

      const intersectionCoordinate = getLineIntersection(
        previousEndCoordinate,
        previousAngle,
        nextStartCoordinate,
        angle,
      )

      result.push(
        intersectionCoordinate || {
          latitude:
            (previousEndCoordinate.latitude + nextStartCoordinate.latitude) / 2,
          longitude:
            (previousEndCoordinate.longitude + nextStartCoordinate.longitude) /
            2,
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
