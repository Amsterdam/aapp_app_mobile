import type {ServiceFeature} from '@/modules/service/types'
import {type Address, Coordinates} from '@/modules/address/types'
import {getDistance} from '@/utils/getDistance'

/**
 * Sort servicePoints by distance to address/location if address/location and coordinates exist
 */
export const getSortedServicePoints = (
  servicePoints: ServiceFeature[],
  address?: Address,
) =>
  address?.coordinates
    ? servicePoints
        .map(point => ({
          ...point,
          distance: getDistance(
            {
              lat: point.geometry.coordinates[1],
              lon: point.geometry.coordinates[0],
            },
            address.coordinates as Coordinates,
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
    : servicePoints
