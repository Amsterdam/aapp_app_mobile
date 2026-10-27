import type {Feature} from 'geojson'
import {useCallback, useMemo} from 'react'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {useSetMapSelection} from '@/components/features/map/MapSelectionContext'
import {useSelector} from '@/hooks/redux/useSelector'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {ServiceMapBottomSheetVariant} from '@/modules/service/exports/bottomsheetVariants'
import type {
  ServiceLineStringFeature,
  ServiceMapResponse,
  ServicePointFeature,
  ServicePolygonFeature,
} from '@/modules/service/exports/types'
import {useGetMapMarkerData} from '@/modules/service/hooks/useGetMapMarkerData'
import {useGetMapPolygonData} from '@/modules/service/hooks/useGetMapPolygonData'
import {selectSelectedServicePointId} from '@/modules/service/slice'

export const useGetMapData = (
  service: ServiceMapResponse | undefined,
  onMapElementPress: (id: Feature['id']) => void,
) => {
  const {data: geojson, icons_to_include: icons} = service || {}
  const {open} = useBottomSheet()
  const selectedServicePointId = useSelector(selectSelectedServicePointId)

  useSetMapSelection(
    ModuleSlug.service,
    selectedServicePointId,
    useCallback(
      id => {
        if (id) {
          open(ServiceMapBottomSheetVariant.servicePointDetails)
        }
      },
      [open],
    ),
  )

  const [polygonFeatures = [], pointFeatures = [], lineStringFeatures = []] =
    useMemo(() => {
      if (typeof geojson !== 'object' || !('type' in geojson)) {
        return [undefined, undefined, undefined]
      }

      return [
        geojson.features.filter(
          (f): f is ServicePolygonFeature =>
            f.geometry.type === 'Polygon' || f.geometry.type === 'MultiPolygon',
        ),
        geojson.features.filter(
          (f): f is ServicePointFeature => f.geometry.type === 'Point',
        ),
        geojson.features.filter(
          (f): f is ServiceLineStringFeature =>
            f.geometry.type === 'LineString',
        ),
      ]
    }, [geojson])

  const polygonData = useGetMapPolygonData(polygonFeatures)
  const lineStringData = useGetMapPolygonData(lineStringFeatures)
  const pointsData = useGetMapMarkerData(
    pointFeatures,
    icons,
    onMapElementPress,
  )

  return {
    data: {
      lineStrings: lineStringData,
      points: pointsData,
      polygons: polygonData,
    },
  }
}
