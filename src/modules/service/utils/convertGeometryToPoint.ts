import type {ServicePointFeature} from '@/modules/service/types'
import type {Feature, Geometry} from 'geojson'
import {getFirstPosition} from '@/modules/service/utils/getFirstPosition'

export const convertGeometryToPoint = (
  features: Array<Feature<Geometry, ServicePointFeature['properties']>>,
): ServicePointFeature[] =>
  features
    .map(f => {
      if (f.geometry && 'coordinates' in f.geometry) {
        return {
          ...f,
          geometry: {
            type: 'Point',
            coordinates: getFirstPosition(f.geometry.coordinates),
          },
        }
      }
    })
    .filter((f): f is ServicePointFeature => {
      if (!f) {
        return false
      }

      const {coordinates} = f.geometry

      return (
        coordinates.length >= 2 &&
        Number.isFinite(coordinates[0]) &&
        Number.isFinite(coordinates[1])
      )
    })
