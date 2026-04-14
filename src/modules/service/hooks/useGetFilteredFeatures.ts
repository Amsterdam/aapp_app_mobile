import {useMemo} from 'react'
import type {
  ServiceMapResponseFilter,
  ServiceFeature,
} from '@/modules/service/types'
import {MapFilterType} from '@/components/features/map/providers/MapFiltersContext'

export const useGetFilteredFeatures = ({
  features,
  filterType,
  activeFilters,
}: {
  activeFilters: ServiceMapResponseFilter[]
  features: ServiceFeature[]
  filterType: MapFilterType | undefined
}) =>
  useMemo(
    () =>
      features.filter(feature =>
        activeFilters[filterType === MapFilterType.layers ? 'some' : 'every'](
          filter => {
            const featureValue = feature.properties?.[filter.filter_key]

            return featureValue === filter.filter_value
          },
        ),
      ),
    [features, activeFilters, filterType],
  )
