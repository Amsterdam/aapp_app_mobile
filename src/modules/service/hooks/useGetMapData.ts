import {useMemo} from 'react'
import type {
  ServiceFeature,
  ServiceGeoJSON,
  ServiceMapResponseFilter,
} from '@/modules/service/types'
import type {EmptyObject} from '@/types/utils'
import {useSetMapSelection} from '@/components/features/map/MapSelectionContext'
import {MapMarkerVariant} from '@/components/features/map/marker/MapMarkerVariants'
import {useSelector} from '@/hooks/redux/useSelector'
import {useGetFilteredFeatures} from '@/modules/service/hooks/useGetFilteredFeatures'
import {selectSelectedServicePointId} from '@/modules/service/slice'

export const useGetMapData = (
  activeFilters: ServiceMapResponseFilter[],
  geojson: ServiceGeoJSON | EmptyObject | undefined,
  onServicePointPress: (id: ServiceFeature['id']) => void,
) => {
  const filteredFeatures = useGetFilteredFeatures({
    activeFilters,
    features: geojson && 'features' in geojson ? geojson?.features : [],
  })

  const selectedServicePointId = useSelector(selectSelectedServicePointId)

  useSetMapSelection(selectedServicePointId)

  return useMemo(
    () =>
      filteredFeatures?.map(({id, ...feature}) => ({
        ...feature,
        properties: {
          id,
          variant: MapMarkerVariant.pin,
          onMarkerPress: () => onServicePointPress(id),
        },
      })),
    [filteredFeatures, onServicePointPress],
  )
}
