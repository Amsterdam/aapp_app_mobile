import {useMemo} from 'react'
import type {
  ServiceMapResponseFilter,
  ServiceFeature,
} from '@/modules/service/types'

export const useGetFilteredFeatures = ({
  features,
  activeFilters,
}: {
  activeFilters: ServiceMapResponseFilter[]
  features: ServiceFeature[]
}) =>
  useMemo(
    () =>
      features.filter(feature =>
        activeFilters.every(filter => {
          const featureValue = feature.properties?.[filter.filter_key]

          return featureValue === filter.filter_value
        }),
      ),
    [features, activeFilters],
  )
