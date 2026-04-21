import type {ServicePolygonFeature} from '@/modules/service/types'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {
  ConditionType,
  useGetFilteredFeatures,
} from '@/modules/service/hooks/useGetFilteredFeatures'

export const useGetMapPolygonData = (features: ServicePolygonFeature[]) => {
  const {layers} = useMapFilters()

  return useGetFilteredFeatures({
    features,
    conditionType: layers?.length ? ConditionType.or : ConditionType.and,
  })
}
