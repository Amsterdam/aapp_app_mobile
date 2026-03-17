import type {ServiceFeature, ServiceMapResponse} from '@/modules/service/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useServicePointListItemData} from '@/modules/service/hooks/useServicePointListItemData'

export const ServicePointListItem = ({
  listProperty,
  servicePoint,
  onPress,
}: {
  listProperty: ServiceMapResponse['list_property']
  onPress: (servicePointId: ServiceFeature['id']) => void
  servicePoint: ServiceFeature
}) => {
  const {accessibilityLabel, listPropertyValue, distanceToPoint} =
    useServicePointListItemData(servicePoint, listProperty)

  return (
    <Box insetHorizontal="md">
      <Pressable
        accessibilityLabel={accessibilityLabel}
        onPress={() => onPress(servicePoint.id)}
        testID="ServicePointListItemButton">
        <Box insetVertical="sm">
          <Column>
            <Title
              accessible={false}
              color="link"
              level="h5"
              text={servicePoint.properties.aapp_title}
            />
            {!!listPropertyValue && (
              <Paragraph accessible={false}>{listPropertyValue}</Paragraph>
            )}
            {!!distanceToPoint && (
              <Paragraph
                accessible={false}
                color="secondary">
                {distanceToPoint}
              </Paragraph>
            )}
          </Column>
        </Box>
      </Pressable>
    </Box>
  )
}
