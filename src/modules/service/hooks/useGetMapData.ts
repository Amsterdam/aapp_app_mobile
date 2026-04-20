import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import type {Service, ServiceFeature} from '@/modules/service/types'
import {useSetMapSelection} from '@/components/features/map/MapSelectionContext'
import {useSelector} from '@/hooks/redux/useSelector'
import {useGetMapMarkerData} from '@/modules/service/hooks/useGetMapMarkerData'
import {useGetMapPolygonData} from '@/modules/service/hooks/useGetMapPolygonData'
import {useServiceQuery} from '@/modules/service/service'
import {selectSelectedServicePointId} from '@/modules/service/slice'

export const useGetMapData = (
  id: Service['id'],
  onServicePointPress: (id: ServiceFeature['id']) => void,
) => {
  const {data: service, ...query} = useServiceQuery(id || skipToken)
  const {data: geojson, icons_to_include: icons} = service || {}

  const selectedServicePointId = useSelector(selectSelectedServicePointId)

  useSetMapSelection(selectedServicePointId)

  const [polygonGeoJson, pointsGeoJson] = useMemo(() => {
    if (typeof geojson !== 'object' || !('type' in geojson)) {
      return [undefined, undefined]
    }

    return [
      {
        ...geojson,
        features: geojson.features.filter(f =>
          f.geometry.type.includes('Polygon'),
        ),
      },
      {
        ...geojson,
        features: geojson.features.filter(f => f.geometry.type === 'Point'),
      },
    ]
  }, [geojson])

  const polygonData = useGetMapPolygonData(polygonGeoJson)
  const pointsData = useGetMapMarkerData(
    pointsGeoJson,
    icons,
    onServicePointPress,
  )

  return {...query, data: {points: pointsData, polygons: polygonData}}
}
