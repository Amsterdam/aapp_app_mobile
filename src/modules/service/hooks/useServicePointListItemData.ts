import {useMemo} from 'react'
import {useSelectedAddress} from '@/modules/address/hooks/useSelectedAddress'
import {
  ServiceDetailPropertyType,
  type ServiceMapResponse,
  type ServicePointFeature,
} from '@/modules/service/types'
import {formatPropertyValue} from '@/modules/service/utils/formatPropertyValue'
import {getFormattedDistanceToPoint} from '@/modules/service/utils/getFormattedDistanceToPoint'
import {ModuleSlug} from '@/modules/slugs'

export const useServicePointListItemData = (
  servicePoint: ServicePointFeature,
  listProperty: ServiceMapResponse['list_property'],
) => {
  const {address} = useSelectedAddress(ModuleSlug.service)

  const distanceToPoint = useMemo(
    () =>
      getFormattedDistanceToPoint(
        {
          lat: servicePoint.geometry.coordinates[1],
          lon: servicePoint.geometry.coordinates[0],
        },
        address?.coordinates,
      ),
    [servicePoint, address],
  )

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

  return {listPropertyValue, accessibilityLabel, distanceToPoint}
}
