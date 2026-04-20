import {useMemo} from 'react'
import type {ServiceFeature} from '@/modules/service/types'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'

export enum ConditionType {
  and = 'every',
  or = 'some',
}

export const useGetFilteredFeatures = ({
  features,
  conditionType = ConditionType.and,
}: {
  conditionType?: ConditionType
  features: ServiceFeature[]
}) => {
  const {activeFilters} = useMapFilters()

  return useMemo(
    () =>
      features.filter(feature =>
        activeFilters[conditionType](filter => {
          const featureValue = feature.properties?.[filter.filter_key]

          return featureValue === filter.filter_value
        }),
      ),
    [features, activeFilters, conditionType],
  )
}
