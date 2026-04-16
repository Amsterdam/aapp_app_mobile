import type {ServiceMapResponse} from '@/modules/service/types'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {Switch} from '@/components/ui/forms/Switch'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {ServicePointCustomIcon} from '@/modules/service/components/ServicePointCustomIcon'

type Props = {
  icons: ServiceMapResponse['icons_to_include']
  layer: ServiceMapResponse['layers'][number]
}

export const ServiceMapLayerSwitch = ({
  icons,
  layer: {icon_label, label, filter_key, filter_value},
}: Props) => {
  const {activeFilters, onPressFilter} = useMapFilters()

  const isActive = activeFilters?.some(
    activeFilter =>
      activeFilter.filter_key === filter_key &&
      activeFilter.filter_value === filter_value,
  )

  const icon = icon_label ? icons?.[icon_label] : undefined

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
