import {skipToken} from '@reduxjs/toolkit/query'
import {useState} from 'react'
import type {ServiceItem, ServiceFeature} from '@/modules/service/types'
import type {Region} from 'react-native-maps'
import {MapBase} from '@/components/features/map/MapBase'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {ControlVariant} from '@/components/features/map/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useGetMapData} from '@/modules/service/hooks/useGetMapData'
import {useServiceQuery} from '@/modules/service/service'
import {ModuleSlug} from '@/modules/slugs'

export const ServicePointMap = ({
  id: serviceId,
  onServicePointPress,
}: {
  id: ServiceItem['id']
  onServicePointPress: (id: ServiceFeature['id']) => void
}) => {
  const [region, setRegion] = useState<Region | undefined>()

  const {
    data: service,
    isLoading,
    isError,
  } = useServiceQuery(serviceId || skipToken)
  const geojson = service?.data

  const {activeFilters, filters, onPressFilter} = useMapFilters()
  const data = useGetMapData(activeFilters, geojson, onServicePointPress)

  if (isLoading) {
    return <PleaseWait testID="ServiceMapPleaseWait" />
  }

  return (
    <MapBase
      controls={[ControlVariant.location]}
      FilterComponent={
        <MapFilters
          activeFilters={activeFilters}
          filters={filters}
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
