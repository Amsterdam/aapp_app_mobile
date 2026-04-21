import {useMemo} from 'react'
import type {ServiceGeoJSON, ServiceMapResponse} from '@/modules/service/types'
import type {Point} from 'geojson'

export const useGetGeoJsonByGeometryType = (
  geojson?: ServiceMapResponse['data'],
) => {
  const [shapesGeoJson, pointsGeoJson] = useMemo(() => {
    if (typeof geojson !== 'object' || !('type' in geojson)) {
      return [undefined, undefined]
    }

    return [
      {
        ...geojson,
        features: geojson.features.filter(f => f.geometry.type !== 'Point'),
      },
      {
        ...geojson,
        features: geojson.features.filter(f => f.geometry.type === 'Point'),
      } as ServiceGeoJSON<Point>,
    ]
  }, [geojson])

  const [geoJsonLineString, shapesGeoJsonExceptLineString] = useMemo(() => {
    if (!shapesGeoJson) return [undefined, undefined]

    return [
      {
        ...shapesGeoJson,
        features: shapesGeoJson.features.filter(
          f => f.geometry.type === 'LineString',
        ),
      },
      {
        ...shapesGeoJson,
        features: shapesGeoJson.features.filter(
          f => f.geometry.type !== 'LineString',
        ),
      },
    ]
  }, [shapesGeoJson])

  return {
    geoJsonLineString,
    shapesGeoJson,
    shapesGeoJsonExceptLineString,
    pointsGeoJson,
  }
}
