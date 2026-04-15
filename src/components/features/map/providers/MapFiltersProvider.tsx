import {skipToken} from '@reduxjs/toolkit/query'
import {type PropsWithChildren, useState, useCallback, useMemo} from 'react'
import type {Service, ServiceMapResponseFilter} from '@/modules/service/types'
import {useMapLayersWithColor} from '@/components/features/map/hooks/useMapLayersWithColor'
import {MapFiltersContext} from '@/components/features/map/providers/MapFiltersContext'
import {useServiceQuery} from '@/modules/service/service'

export const MapFiltersProvider = ({
  children,
  serviceId,
}: PropsWithChildren<{serviceId: Service['id']}>) => {
  const {data: service} = useServiceQuery(serviceId || skipToken)
  const filters = service?.filters
  const layers = useMapLayersWithColor(service)

  const [activeFilters, setActiveFilters] = useState<
    ServiceMapResponseFilter[]
  >(layers || [])

  const onPressFilter = useCallback((filter: ServiceMapResponseFilter) => {
    setActiveFilters(currentFilters =>
      currentFilters.some(f => getFilterIsEqual(f, filter))
        ? currentFilters.filter(f => !getFilterIsEqual(f, filter))
        : [...currentFilters, filter],
    )
  }, [])

  const value = useMemo(
    () => ({activeFilters, onPressFilter, filters, layers}),
    [activeFilters, onPressFilter, filters, layers],
  )

  return (
    <MapFiltersContext.Provider value={value}>
      {children}
    </MapFiltersContext.Provider>
  )
}

const getFilterIsEqual = (
  filterA: ServiceMapResponseFilter,
  filterB: ServiceMapResponseFilter,
) =>
  filterA.filter_key === filterB.filter_key &&
  filterA.filter_value === filterB.filter_value
