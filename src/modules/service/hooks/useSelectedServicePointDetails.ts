import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import type {MarkerProperties} from '@/components/features/map/types'
import type {Coordinates} from '@/types/location'
import {useSelector} from '@/hooks/redux/useSelector'
import {useServiceQuery} from '@/modules/service/service'
import {selectSelectedServicePointId} from '@/modules/service/slice'
import {ServiceFeatureProperty, type Service} from '@/modules/service/types'
import {formatPropertyValue} from '@/modules/service/utils/formatPropertyValue'

type SelectedServicePointDetails = {
  coordinates: Coordinates
  id: MarkerProperties['id']
  properties: Array<ServiceFeatureProperty>
  subtitle?: string
  title: string
}

export const useSelectedServicePointDetails = (serviceId: Service['id']) => {
  const selectedServicePointId = useSelector(selectSelectedServicePointId)

  const {data} = useServiceQuery(serviceId || skipToken)

  return useMemo(() => {
    const {properties_to_include = [], data: geojson} = data || {}

    if (
      (typeof selectedServicePointId !== 'number' &&
        typeof selectedServicePointId !== 'string') ||
      !geojson ||
      !('features' in geojson)
    ) {
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
      subtitle: servicePoint.properties.aapp_subtitle,
      coordinates: {
        lat: servicePoint.geometry.coordinates[1],
        lon: servicePoint.geometry.coordinates[0],
      },
      properties: properties_to_include
        .map(({property_key, property_type: type, ...rest}) => ({
          ...rest,
          type,
          value: formatPropertyValue(
            type,
            servicePoint.properties[property_key],
          ),
        }))
        .filter((property: ServiceFeatureProperty) => !!property.value),
    } satisfies SelectedServicePointDetails
  }, [data, selectedServicePointId])
}
