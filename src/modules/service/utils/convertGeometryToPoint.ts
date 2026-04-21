import type {ServiceGeoJSON, ServicePointFeature} from '@/modules/service/types'
import {getFirstPosition} from '@/modules/service/utils/getFirstPosition'

export const convertGeometryToPoint = (
  features: ServiceGeoJSON['features'],
): ServicePointFeature[] =>
  features
    .map(feature => {
      if (feature.geometry && 'coordinates' in feature.geometry) {
        return {
          ...feature,
          geometry: {
            type: 'Point',
            coordinates: getFirstPosition(feature.geometry.coordinates),
          },
        }
      }
    })
    .filter((feature): feature is ServicePointFeature => {
      if (!feature) {
        return false
      }

      const {coordinates} = feature.geometry

      return (
        coordinates.length >= 2 &&
        Number.isFinite(coordinates[0]) &&
        Number.isFinite(coordinates[1])
      )
    })
