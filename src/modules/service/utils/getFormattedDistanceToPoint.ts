import type {Coordinates} from '@/modules/address/types'
import {getDistance} from '@/utils/getDistance'

export const getFormattedDistanceToPoint = (
  pointA?: Coordinates,
  pointB?: Coordinates,
) => {
  if (!pointA || !pointB) {
    return
  }

  const distance = getDistance(pointA, pointB)

  return distance >= 1000
    ? `${(distance / 1000).toFixed(1)} km`
    : `${Math.round(distance)} meter`
}
