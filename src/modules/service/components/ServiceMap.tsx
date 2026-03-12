import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useState} from 'react'
import type {
  ServiceItem,
  ServiceMapResponseFilter,
} from '@/modules/service/types'
import type {Region} from 'react-native-maps'
import {MapBase} from '@/components/features/map/MapBase'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {ControlVariant} from '@/components/features/map/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {ServiceFilterItems} from '@/modules/service/components/ServiceFilterItems'
import {useGetMapData} from '@/modules/service/hooks/useGetMapData'
import {useServiceQuery} from '@/modules/service/service'
import {ModuleSlug} from '@/modules/slugs'

export const ServiceMap = ({id: serviceId}: {id: ServiceItem['id']}) => {
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
      filters.some(f => f === filter)
        ? filters.filter(f => f !== filter)
        : [...filters, filter],
    )
  }, [])

  if (isLoading) {
    return <PleaseWait testID="ServiceMapPleaseWait" />
  }

  return (
    <MapBase
      controls={[ControlVariant.location]}
      Filters={
        <ServiceFilterItems
          activeFilters={activeFilters}
          filters={service?.filters}
          onPressFilter={onPressFilter}
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
