import {useMemo} from 'react'
import type {
  ServiceDetailPropertyType,
  ServiceFeature,
  ServiceMapResponse,
} from '@/modules/service/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {formatPropertyValue} from '@/modules/service/utils/formatPropertyValue'
import {ModuleSlug} from '@/modules/slugs'
import {getDistance} from '@/utils/getDistance'

export const ServicePointListItem = ({
  listProperty,
  servicePoint,
  onPress,
}: {
  listProperty: ServiceMapResponse['list_property']
  onPress: (servicePointId: ServiceFeature['id']) => void
  servicePoint: ServiceFeature
}) => {
  const {address} = useSelectedAddress(ModuleSlug.service)

  const distanceToPoint = useMemo(() => {
    if (!address?.coordinates) {
      return
    }

    const distance = getDistance(
      {
        lat: servicePoint.geometry.coordinates[1],
        lon: servicePoint.geometry.coordinates[0],
      },
      address?.coordinates,
    )

    return distance >= 1000
      ? `${(distance / 1000).toFixed(1)} km`
      : `${Math.round(distance)} meter`
  }, [servicePoint, address])

  const listPropertyValue = useMemo(() => {
    if (servicePoint?.properties && listProperty) {
      return formatPropertyValue(
        listProperty.type as ServiceDetailPropertyType,
        servicePoint.properties[listProperty.key] as number | string | null,
      )
    }
  }, [servicePoint, listProperty])

  const accessibilityLabel = useMemo(
    () =>
      [
        servicePoint.properties.aapp_title,
        listPropertyValue,
        distanceToPoint ? `Afstand: ${distanceToPoint}` : undefined,
      ]
        .filter(Boolean)
        .join(', '),
    [servicePoint, listPropertyValue, distanceToPoint],
  )

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
