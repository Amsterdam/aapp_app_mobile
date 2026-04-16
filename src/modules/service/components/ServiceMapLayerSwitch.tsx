import type {
  ServiceMapResponse,
  ServiceMapResponseFilter,
} from '@/modules/service/types'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {Switch} from '@/components/ui/forms/Switch'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {ServicePointCustomIcon} from '@/modules/service/components/ServicePointCustomIcon'

type Props = {
  icons: ServiceMapResponse['icons_to_include']
  layer: ServiceMapResponseFilter & {aapp_icon_type?: string} // TODO: change typing when icons data is added to layers
}

export const ServiceMapLayerSwitch = ({
  icons,
  layer: {aapp_icon_type, label, filter_key, filter_value},
}: Props) => {
  const {activeFilters, onPressFilter} = useMapFilters()

  const isActive = activeFilters?.some(
    activeFilter =>
      activeFilter.filter_key === filter_key &&
      activeFilter.filter_value === filter_value,
  )

  const icon = aapp_icon_type ? icons?.[aapp_icon_type] : undefined

  return (
    <Switch
      key={label}
      label={
        <Row gutter="md">
          {!!icon && (
            <ServicePointCustomIcon
              icon={icon}
              testID={`ServiceMapLayers${label}ServicePointCustomIcon`}
            />
          )}
          <Phrase>{label}</Phrase>
        </Row>
      }
      onChange={() => onPressFilter({label, filter_key, filter_value})}
      testID={`ServiceMapLayers${label}ServicePointSwitch`}
      value={isActive}
    />
  )
}
