import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import type {ServiceFeatureProperty} from '@/modules/service/types'
import {useSelector} from '@/hooks/redux/useSelector'
import {useServiceQuery} from '@/modules/service/service'
import {selectSelectedServicePointId} from '@/modules/service/slice'

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
        .map(({property_key, property_type, icon, label}) => {
          const isOpeningHours = property_key === 'aapp_opening_hours'
          const isDaysOpen = property_key === 'aapp_days_open'

          if (isDaysOpen) {
            return {icon, label}
          }

          const openingHoursCombined =
            `${servicePoint.properties[property_key]}\n${servicePoint.properties.aapp_days_open ?? ''}`.trim()

          return {
            [property_type]: isOpeningHours
              ? openingHoursCombined
              : servicePoint.properties[property_key],
            icon,
            label,
          }
        })
        .filter(property => Object.entries(property)[0][1] !== null),
    } satisfies SelectedServicePointDetails
  }, [data, selectedServicePointId])
}
