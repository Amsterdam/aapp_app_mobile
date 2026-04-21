import type {ServicePointFeature} from '@/modules/service/types'
import type {Feature} from 'geojson'
import {getFirstPosition} from '@/modules/service/utils/getFirstPosition'

export const convertGeometryToPoint = (features: Feature[]) =>
  features
    .map(f => {
      if ('coordinates' in f.geometry) {
        return {
          ...f,
          geometry: {
            type: 'Point',
            coordinates: getFirstPosition(f.geometry.coordinates),
          },
        }
      }
    })
    .filter(
      (f): f is ServicePointFeature =>
        Boolean(f) && typeof f?.geometry.coordinates[0] === 'number',
    )
