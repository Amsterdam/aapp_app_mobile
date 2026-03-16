import {useMemo} from 'react'
import type {ServiceFeature} from '@/modules/service/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {ModuleSlug} from '@/modules/slugs'
import {formatNumber} from '@/utils/formatNumber'
import {getDistance} from '@/utils/getDistance'

export const ServicePointListItem = ({
  servicePoint,
  onPress,
}: {
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

  const price = useMemo(() => {
    if (
      servicePoint &&
      'Prijs_per_gebruik' in servicePoint.properties &&
      !Number.isNaN(servicePoint.properties.Prijs_per_gebruik)
    ) {
      return formatNumber(
        servicePoint.properties.Prijs_per_gebruik as number,
        'EUR',
      )
    }
  }, [servicePoint])

  return (
    <Box insetHorizontal="md">
      <Pressable
        accessibilityLabel={`${servicePoint.properties.aapp_title}, ${price}, ${distanceToPoint ? 'Afstand: ' + distanceToPoint : ''}`}
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
            {!!price && <Paragraph accessible={false}>{price}</Paragraph>}
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
