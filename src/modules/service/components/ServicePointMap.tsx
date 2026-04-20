import {useState} from 'react'
import type {Service, ServiceFeature} from '@/modules/service/types'
import type {Region} from 'react-native-maps'
import {MapBase} from '@/components/features/map/MapBase'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {
  DEFAULT_CLUSTER_OPTIONS,
  HIGH_DATA_COUNT_CLUSTER_OPTIONS,
} from '@/components/features/map/constants'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {Polygon} from '@/components/features/map/polygon/Polygon'
import {ControlVariant} from '@/components/features/map/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useGetMapData} from '@/modules/service/hooks/useGetMapData'
import {ModuleSlug} from '@/modules/slugs'

type Props = {
  id: Service['id']
  onServicePointPress: (id: ServiceFeature['id']) => void
}

export const ServicePointMap = ({
  id: serviceId,
  onServicePointPress,
}: Props) => {
  const [region, setRegion] = useState<Region | undefined>()

  const {
    isLoading,
    isError,
    data: {polygons, points},
  } = useGetMapData(serviceId, onServicePointPress)

  const {activeFilters, filters, onPressFilter, layers} = useMapFilters()

  if (isLoading) {
    return <PleaseWait testID="ServiceMapPleaseWait" />
  }

  return (
    <MapBase
      controls={[
        ...(layers?.length ? [ControlVariant.layers] : []),
        ControlVariant.location,
      ]}
      FilterComponent={
        <MapFilters
          activeFilters={activeFilters}
          filters={filters}
          onPressFilter={onPressFilter}
          testID="ServiceMapFilters"
        />
      }
      isError={isError}
      moduleSlug={ModuleSlug.service}
      onRegionChangeComplete={setRegion}>
      {!!polygons?.length && (
        <Polygon
          data={polygons}
          onPress={id => onServicePointPress(id)}
        />
      )}
      <Clusterer
        clusterOptions={
          points.length < 400
            ? DEFAULT_CLUSTER_OPTIONS
            : HIGH_DATA_COUNT_CLUSTER_OPTIONS
        }
        data={points}
        region={region}
        shouldGroup
      />
    </MapBase>
  )
}
