import type {ServiceGeoJSON} from '@/modules/service/types'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {
  ConditionType,
  useGetFilteredFeatures,
} from '@/modules/service/hooks/useGetFilteredFeatures'

export const useGetMapPolygonData = (geojson?: ServiceGeoJSON) => {
  const {layers} = useMapFilters()

  return useGetFilteredFeatures({
    features: geojson && 'features' in geojson ? geojson?.features : [],
    conditionType: layers?.length ? ConditionType.or : ConditionType.and,
  })
}
