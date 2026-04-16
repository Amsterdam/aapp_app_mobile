import {skipToken} from '@reduxjs/toolkit/query'
import type {Service} from '@/modules/service/types'
import {useBottomSheet} from '@/components/features/bottom-sheet/hooks/useBottomSheet'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useAccessibilityFocus} from '@/hooks/accessibility/useAccessibilityFocus'
import {ServiceMapLayerSwitch} from '@/modules/service/components/ServiceMapLayerSwitch'
import {useServiceQuery} from '@/modules/service/service'

export const ServiceMapLayers = ({id: serviceId}: {id: Service['id']}) => {
  const {close: closeBottomSheet} = useBottomSheet()

  const {data: service} = useServiceQuery(serviceId || skipToken)
  const {layers, activeFilters, onPressFilter} = useMapFilters()

  const icons = service?.icons_to_include

  const autoFocus = useAccessibilityFocus()

  return (
    <Box>
      <Column gutter="lg">
        <Row align="between">
          <Title
            level="h3"
            ref={autoFocus}
            text="Kaartlagen"
          />
          <IconButton
            accessibilityLabel="Sluit kaartlagen venster"
            icon={
              <Icon
                name="close"
                size="ml"
              />
            }
            onPress={closeBottomSheet}
            testID="ServiceMapLayersCloseButton"
          />
        </Row>
        <Column gutter="lg">
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
      </Column>
    </Box>
  )
}
