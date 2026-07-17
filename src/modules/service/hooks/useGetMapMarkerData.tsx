import {useMemo} from 'react'
import type {MarkerProperties} from '@/components/features/map/types'
import type {
  ServicePointFeature,
  ServiceMapResponse,
} from '@/modules/service/types'
import {
  ConditionType,
  useGetFilteredFeatures,
} from '@/components/features/map/hooks/useGetFilteredFeatures'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {MapMarkerVariant} from '@/components/features/map/marker/MapMarkerVariants'
import {ServicePointCustomMarker} from '@/modules/service/components/ServicePointCustomMarker'

export const useGetMapMarkerData = (
  features: ServicePointFeature[],
  icons: ServiceMapResponse['icons_to_include'],
  onMarkerPress: (id: ServicePointFeature['id']) => void,
) => {
  const {layers} = useMapFilters()

  const filteredFeatures = useGetFilteredFeatures({
    features,
    conditionType: layers?.length ? ConditionType.or : ConditionType.and,
  })

  return useMemo(
    () =>
      filteredFeatures?.map(({id, properties, ...feature}, index) => {
        const {aapp_icon_type, ...restProperties} = properties
        const iconProps =
          aapp_icon_type && icons
            ? {Icon: <ServicePointCustomMarker icon={icons[aapp_icon_type]} />}
            : {variant: MapMarkerVariant.pin}

        return {
          ...feature,
          properties: {
            id: id || `${restProperties.aapp_title}-${index}`,
            ...restProperties,
            ...iconProps,
            onMarkerPress: () => onMarkerPress(id),
          } satisfies MarkerProperties,
        }
      }),
    [filteredFeatures, onMarkerPress, icons],
  )
}
