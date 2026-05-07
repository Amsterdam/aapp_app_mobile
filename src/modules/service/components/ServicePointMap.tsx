import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo, useState} from 'react'
import {type Region} from 'react-native-maps'
import type {Service} from '@/modules/service/types'
import type {Feature} from 'geojson'
import {MapBase} from '@/components/features/map/MapBase'
import {Clusterer} from '@/components/features/map/clusters/Clusterer'
import {
  DEFAULT_CLUSTER_OPTIONS,
  HIGH_DATA_COUNT_CLUSTER_OPTIONS,
} from '@/components/features/map/constants'
import {MapFilters} from '@/components/features/map/filters/MapFilters'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {LineString} from '@/components/features/map/line-string/LineString'
import {Polygons} from '@/components/features/map/polygon/Polygons'
import {ControlVariant} from '@/components/features/map/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {useGetMapData} from '@/modules/service/hooks/useGetMapData'
import {useServiceQuery} from '@/modules/service/service'
import {ModuleSlug} from '@/modules/slugs'

type Props = {
  id: Service['id']
  onMapElementPress: (id: Feature['id']) => void
}

export const ServicePointMap = ({id: serviceId, onMapElementPress}: Props) => {
  const [region, setRegion] = useState<Region | undefined>()

  const {
    data: service,
    isLoading,
    isError,
  } = useServiceQuery(serviceId || skipToken)
  const {
    data: {lineStrings, polygons, points},
  } = useGetMapData(service, onMapElementPress)

  const {icons_to_include} = service || {}

  const {layers} = useMapFilters()

  const controls: ControlVariant[] = useMemo(() => {
    const result: ControlVariant[] = [ControlVariant.location]

    if (layers?.length) {
      result.unshift(ControlVariant.layers)
    } else if (icons_to_include) {
      result.unshift(ControlVariant.legend)
    }

    return result
  }, [layers, icons_to_include])

  if (isLoading) {
    return <PleaseWait testID="ServiceMapPleaseWait" />
  }

  return (
    <MapBase
      controls={controls}
      FilterComponent={<MapFilters testID="ServiceMapFilters" />}
      isError={isError}
      moduleSlug={ModuleSlug.service}
      onRegionChangeComplete={setRegion}>
      {!!polygons?.length && (
        <Polygons
          data={polygons}
          onPress={onMapElementPress}
        />
      )}
      {lineStrings?.length
        ? lineStrings.map(feature => (
            <LineString
              coordinates={
                'coordinates' in feature.geometry
                  ? feature.geometry.coordinates
                  : []
              }
              id={feature.id}
              key={feature.id}
              onPress={onMapElementPress}
              strokeColor={feature.properties.stroke as string | null}
              strokeWidth={
                feature.properties['stroke-width']
                  ? Number(feature.properties['stroke-width'])
                  : null
              }
            />
          ))
        : null}
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
