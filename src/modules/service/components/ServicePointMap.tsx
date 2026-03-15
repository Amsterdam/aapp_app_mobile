import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useState} from 'react'
import type {
  ServiceItem,
  ServiceMapResponseFilter,
} from '@/modules/service/types'
import type {Region} from 'react-native-maps'
import {MapBase} from '@/components/features/map/MapBase'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {ControlVariant} from '@/components/features/map/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useGetMapData} from '@/modules/service/hooks/useGetMapData'
import {useServiceQuery} from '@/modules/service/service'
import {ModuleSlug} from '@/modules/slugs'

export const ServicePointMap = ({id: serviceId}: {id: ServiceItem['id']}) => {
  const {
    data: service,
    isLoading,
    isError,
  } = useServiceQuery(serviceId || skipToken)
  const geojson = service?.data
  const [activeFilters, setActiveFilters] = useState<
    ServiceMapResponseFilter[]
  >([])
  const data = useGetMapData(activeFilters, geojson)
  const [region, setRegion] = useState<Region | undefined>()

  const onPressFilter = useCallback((filter: ServiceMapResponseFilter) => {
    setActiveFilters(filters =>
      filters.some(f => getFilterIsEqual(f, filter))
        ? filters.filter(f => !getFilterIsEqual(f, filter))
        : [...filters, filter],
    )
  }, [])

  if (isLoading) {
    return <PleaseWait testID="ServiceMapPleaseWait" />
  }

  return (
    <MapBase
      controls={[ControlVariant.location]}
      FilterComponent={
        <MapFilters
          activeFilters={activeFilters}
          filters={service?.filters}
          onPressFilter={onPressFilter}
          testID="ServiceMapFilters"
        />
      }
      isError={isError || !data?.length}
      moduleSlug={ModuleSlug.service}
      onRegionChangeComplete={setRegion}>
      <Clusterer
        data={data}
        region={region}
      />
    </MapBase>
  )
}

const getFilterIsEqual = (
  filterA: ServiceMapResponseFilter,
  filterB: ServiceMapResponseFilter,
) =>
  filterA.filter_key === filterB.filter_key &&
  filterA.filter_value === filterB.filter_value
