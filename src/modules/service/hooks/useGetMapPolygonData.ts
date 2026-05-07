import type {
  ServiceLineStringFeature,
  ServicePolygonFeature,
} from '@/modules/service/types'
import {
  ConditionType,
  useGetFilteredFeatures,
} from '@/components/features/map/hooks/useGetFilteredFeatures'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'

export const useGetMapPolygonData = <
  Feature extends ServicePolygonFeature | ServiceLineStringFeature,
>(
  features: Feature[],
) => {
  const {layers} = useMapFilters()

  return useGetFilteredFeatures({
    features,
    conditionType: layers?.length ? ConditionType.or : ConditionType.and,
  })
}
