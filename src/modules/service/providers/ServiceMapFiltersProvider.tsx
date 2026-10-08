import {skipToken} from '@reduxjs/toolkit/query'
import {type PropsWithChildren, useMemo} from 'react'
import {MapFiltersProvider} from '@/components/features/map/providers/MapFilters.provider'
import {useServiceQuery} from '@/modules/service/service'
import type {Service} from '@/modules/service/types'

export const ServiceMapFiltersProvider = ({
  children,
  serviceId,
}: PropsWithChildren<{serviceId: Service['id']}>) => {
  const {data: service} = useServiceQuery(serviceId || skipToken)
  const filters = service?.filters

  const layers = useMemo(
    () =>
      service?.layers?.map(layer => ({
        ...layer,
        icon: service?.icons_to_include?.[layer.icon_label],
      })),
    [service],
  )

  return (
    <MapFiltersProvider
      filters={filters}
      layers={layers}>
      {children}
    </MapFiltersProvider>
  )
}
