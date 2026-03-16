import {type Address, Coordinates} from '@/modules/address/types'
import {getDistance} from '@/utils/getDistance'

/**
 * Sort points by distance to address/location if address/location and coordinates exist
 */
export const sortByDistanceToAddress = <T extends Coordinates>(
  points: T[],
  address?: Address,
) =>
  address?.coordinates
    ? points
        .map(point => ({
          ...point,
          distance: getDistance(
            {
              lat: point.lat,
              lon: point.lon,
            },
            address.coordinates as Coordinates,
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
    : points
