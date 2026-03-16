import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {useSelector} from '@/hooks/redux/useSelector'
import {useServiceQuery} from '@/modules/service/service'
import {selectSelectedServicePointId} from '@/modules/service/slice'

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

    return {
      id: selectedServicePointId,
      title: servicePoint?.properties.aapp_title,
      coordinates: {
        lat: servicePoint?.geometry.coordinates[1],
        lon: servicePoint?.geometry.coordinates[0],
      },
      properties: properties_to_include.map(
        ({property_key, property_type, icon, label}) => ({
          [property_type]: servicePoint?.properties[property_key],
          icon,
          label,
        }),
      ),
    }
  }, [data, selectedServicePointId])
}
