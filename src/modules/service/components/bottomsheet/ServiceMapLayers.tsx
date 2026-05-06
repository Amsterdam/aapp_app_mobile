import {skipToken} from '@reduxjs/toolkit/query'
import type {Service} from '@/modules/service/types'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {ServiceMapLayerSwitch} from '@/modules/service/components/ServiceMapLayerSwitch'
import {useServiceQuery} from '@/modules/service/service'

export const ServiceMapLayers = ({id: serviceId}: {id: Service['id']}) => {
  const {data: service} = useServiceQuery(serviceId || skipToken)
  const {layers, activeFilters, onPressFilter} = useMapFilters()

  const icons = service?.icons_to_include

  const autoFocus = useAccessibilityFocus()

  return (
    <Box
      insetBottom="md"
      insetHorizontal="md">
      <Column gutter="lg">
        <Title
          level="h3"
          ref={autoFocus}
          text="Kaartlagen"
        />

        {layers?.map(layer => {
          const isActive = activeFilters?.some(
            activeFilter =>
              activeFilter.filter_key === layer.filter_key &&
              activeFilter.filter_value === layer.filter_value,
          )

          return (
            <ServiceMapLayerSwitch
              icons={icons}
              isActive={isActive}
              key={layer.label}
              layer={layer}
              onPress={onPressFilter}
            />
          )
        })}
      </Column>
    </Box>
  )
}
