import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import type {ServiceGeoJSON} from '@/modules/service/types'
import {useSelector} from '@/hooks/redux/useSelector'
import {useServiceQuery} from '@/modules/service/service'
import {selectSelectedServicePointId} from '@/modules/service/slice'

const isServiceGeoJSON = (value: unknown): value is ServiceGeoJSON => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const record = value as {features?: unknown; type?: unknown}

  return record.type === 'FeatureCollection' && Array.isArray(record.features)
}

export const useSelectedServicePointDetails = (serviceId: string) => {
  const selectedServicePointId = useSelector(selectSelectedServicePointId)

  const {data} = useServiceQuery(serviceId || skipToken)

  return useMemo(() => {
    const propertiesToInclude = data?.properties_to_include ?? []
    const geojson = data?.data

    if (!selectedServicePointId || !isServiceGeoJSON(geojson)) {
      return
    }

    const servicePoint = geojson.features.find(
      feature => feature.id === selectedServicePointId,
    )

    return {
      id: selectedServicePointId,
      title: servicePoint?.properties.aapp_title,
      coordinates: {
        lat: servicePoint?.geometry.coordinates[1],
        lon: servicePoint?.geometry.coordinates[0],
      },
      properties: propertiesToInclude.map(
        ({property_key, property_type, icon, label}) => ({
          [property_type]: servicePoint?.properties[property_key],
          icon,
          label,
        }),
      ),
    }
  }, [data, selectedServicePointId])
}
