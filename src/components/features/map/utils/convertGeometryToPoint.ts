import {Feature, type Geometry, Point} from 'geojson'
import {getFirstPosition} from '@/components/features/map/utils/getFirstPosition'

export const convertGeometryToPoint = <Properties extends object | null>(
  features: Feature<Geometry, Properties>[],
): Feature<Point, Properties>[] =>
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
    .filter((feature): feature is Feature<Point, Properties> => {
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
