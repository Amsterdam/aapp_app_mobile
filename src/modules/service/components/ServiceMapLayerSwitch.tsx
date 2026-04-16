import type {
  ServiceMapResponse,
  ServiceMapResponseFilter,
} from '@/modules/service/types'
import {Switch} from '@/components/ui/forms/Switch'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {ServicePointCustomIcon} from '@/modules/service/components/ServicePointCustomIcon'

type Props = {
  icons: ServiceMapResponse['icons_to_include']
  isActive: boolean
  layer: ServiceMapResponse['layers'][number]
  onPress: (filter: ServiceMapResponseFilter) => void
}

export const ServiceMapLayerSwitch = ({
  icons,
  layer,
  onPress,
  isActive,
}: Props) => {
  const {icon_label, label} = layer
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
      onChange={() => onPress(layer)}
      testID={`ServiceMapLayers${label}ServicePointSwitch`}
      value={isActive}
    />
  )
}
