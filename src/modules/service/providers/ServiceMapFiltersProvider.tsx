import {skipToken} from '@reduxjs/toolkit/query'
import {type PropsWithChildren, useMemo} from 'react'
import type {
  MapLayer,
  Service,
  ServiceMapResponseFilter,
} from '@/modules/service/types'
import {MapFiltersProvider} from '@/components/features/map/providers/MapFiltersProvider'
import {useServiceQuery} from '@/modules/service/service'

type Props = {
  extraFilters?: ServiceMapResponseFilter<string>[]
  extraLayers?: MapLayer<string>[]
  serviceId: Service['id']
}

export const ServiceMapFiltersProvider = ({
  children,
  serviceId,
  extraFilters = [],
  extraLayers = [],
}: PropsWithChildren<Props>) => {
  const {data: service} = useServiceQuery(serviceId || skipToken)

  const filters = useMemo<
    ServiceMapResponseFilter<string>[] | undefined
  >(() => {
    if (!service?.filters) {
      return
    }

    return service.filters.concat(extraFilters)
  }, [service, extraFilters])

  const layers = useMemo<MapLayer<string>[] | undefined>(() => {
    if (!service?.layers) {
      return
    }

    return service.layers
      .map(layer => ({
        ...layer,
        icon: service?.icons_to_include?.[layer.icon_label],
      }))
      .concat(extraLayers)
  }, [service, extraLayers])

  return (
    <MapFiltersProvider
      filters={filters}
      layers={layers}>
      {children}
    </MapFiltersProvider>
  )
}
