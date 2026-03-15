import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useServiceQuery} from '@/modules/service/service'
import {selectSelectedServicePointId} from '@/modules/service/slice'
import {
  ServiceFeatureProperty,
  ServiceDetailPropertyKey,
} from '@/modules/service/types'
import {formatPropertyValue} from '@/modules/service/utils/formatPropertyValue'

type SelectedServicePointDetails = {
  coordinates: {
    lat: number
    lon: number
  }
  id: string
  properties: Array<ServiceFeatureProperty>
  title: string
}

export const useSelectedServicePointDetails = (serviceId: string) => {
  const selectedServicePointId = useSelector(selectSelectedServicePointId)

  const {data} = useServiceQuery(serviceId || skipToken)

  return useMemo(() => {
    const {properties_to_include = [], data: geojson} = data || {}

    if (!selectedServicePointId || !geojson || !('features' in geojson)) {
      return
    }

    const servicePoint = geojson.features?.find(
      feature => feature.id === selectedServicePointId,
    )

    if (!servicePoint) {
      return
    }

    return {
      id: selectedServicePointId,
      title: servicePoint.properties.aapp_title,
      coordinates: {
        lat: servicePoint.geometry.coordinates[1],
        lon: servicePoint.geometry.coordinates[0],
      },
      properties: properties_to_include
        .map(({property_key, property_type: type, ...rest}) => {
          if (property_key === ServiceDetailPropertyKey.aapp_days_open) {
            // Skip app_days_open as it will be concatenated to aapp_opening_hours as per design
            return {
              ...rest,
              type,
              value: null,
            }
          }

          // app_days_open must be concatenated to aapp_opening_hours as per design
          const openingHoursAndDaysCombined = [
            servicePoint.properties[property_key],
            servicePoint.properties.aapp_days_open,
          ]
            .join('\n')
            .trim()

          return {
            ...rest,
            type,
            value: formatPropertyValue(
              type,
              property_key === ServiceDetailPropertyKey.aapp_opening_hours
                ? openingHoursAndDaysCombined
                : servicePoint.properties[property_key],
            ),
          }
        })
        .filter(
          (property): property is ServiceFeatureProperty =>
            property.value !== null && property.value !== '',
        ),
    } satisfies SelectedServicePointDetails
  }, [data, selectedServicePointId])
}
