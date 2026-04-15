import {useMemo} from 'react'
import type {
  ServiceMapResponseFilter,
  ServiceFeature,
} from '@/modules/service/types'

export enum ConditionType {
  and = 'every',
  or = 'some',
}
export const useGetFilteredFeatures = ({
  features,
  activeFilters,
  conditionType = ConditionType.and,
}: {
  activeFilters: ServiceMapResponseFilter[]
  conditionType?: ConditionType
  features: ServiceFeature[]
}) =>
  useMemo(
    () =>
      features.filter(feature =>
        activeFilters[conditionType](filter => {
          const featureValue = feature.properties?.[filter.filter_key]

          return featureValue === filter.filter_value
        }),
      ),
    [features, activeFilters, conditionType],
  )
