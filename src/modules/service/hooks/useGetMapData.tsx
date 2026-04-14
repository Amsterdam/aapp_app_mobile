import {useMemo} from 'react'
import type {MarkerProperties} from '@/components/features/map/types'
import type {
  ServiceFeature,
  ServiceGeoJSON,
  ServiceMapResponse,
  ServiceMapResponseFilter,
} from '@/modules/service/types'
import type {EmptyObject} from '@/types/utils'
import {useSetMapSelection} from '@/components/features/map/MapSelectionContext'
import {MapMarkerVariant} from '@/components/features/map/marker/MapMarkerVariants'
import {useSelector} from '@/hooks/redux/useSelector'
import {ServicePointCustomMarker} from '@/modules/service/components/ServicePointCustomMarker'
import {
  ConditionType,
  useGetFilteredFeatures,
} from '@/modules/service/hooks/useGetFilteredFeatures'
import {selectSelectedServicePointId} from '@/modules/service/slice'

export const useGetMapData = (
  activeFilters: ServiceMapResponseFilter[],
  geojson: ServiceGeoJSON | EmptyObject | undefined,
  icons: ServiceMapResponse['icons_to_include'],
  onServicePointPress: (id: ServiceFeature['id']) => void,
  selectorConditionType: ConditionType = ConditionType.and,
) => {
  const filteredFeatures = useGetFilteredFeatures({
    activeFilters,
    features: geojson && 'features' in geojson ? geojson?.features : [],
    conditionType: selectorConditionType,
  })

  const selectedServicePointId = useSelector(selectSelectedServicePointId)

  useSetMapSelection(selectedServicePointId)

  return useMemo(
    () =>
      filteredFeatures?.map(({id, properties, ...feature}) => {
        const {aapp_icon_type, ...restProperties} = properties
        const iconProps =
          aapp_icon_type && icons
            ? {Icon: <ServicePointCustomMarker icon={icons[aapp_icon_type]} />}
            : {variant: MapMarkerVariant.pin}

        return {
          ...feature,
          properties: {
            id,
            ...restProperties,
            ...iconProps,
            onMarkerPress: () => onServicePointPress(id),
          } satisfies MarkerProperties,
        }
      }),
    [filteredFeatures, onServicePointPress, icons],
  )
}
