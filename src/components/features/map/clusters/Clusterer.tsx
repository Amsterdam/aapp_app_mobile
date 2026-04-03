import {useCallback} from 'react'
import {useWindowDimensions} from 'react-native'
import {
  // eslint-disable-next-line no-restricted-imports
  Clusterer as RNClusterer,
  type Supercluster,
} from 'react-native-clusterer'

import type {
  ClusterItem,
  ClusterProperties,
  MarkerProperties,
} from '@/components/features/map/types'
import type {MapMarkerProps, Region} from 'react-native-maps'
import {ClusterSwitch} from '@/components/features/map/clusters/ClusterSwitch'
import {AMSTERDAM_REGION} from '@/components/features/map/constants'

export type ClustererProps = {
  clusterOptions?: Supercluster.Options<
    MarkerProperties | ClusterProperties,
    MarkerProperties | ClusterProperties
  >
  data: Supercluster.PointFeature<MarkerProperties>[]
  mapDimensions?: {height: number; width: number}
  region?: Region
} & Omit<MapMarkerProps, 'coordinate'>

const defaultClusterOptions: Supercluster.Options<
  MarkerProperties | ClusterProperties,
  MarkerProperties | ClusterProperties
> = {
  minZoom: 0,
  maxZoom: 16,
  minPoints: 2,
  radius: 30,
  extent: 512,
}

const getItemKey = (item: ClusterItem) =>
  'cluster_id' in item.properties
    ? `cluster-${item.properties?.cluster_id}-${item.properties.point_count}`
    : `point-${item.properties?.id}`

export const Clusterer = ({
  data,
  region = AMSTERDAM_REGION,
  mapDimensions,
  clusterOptions = defaultClusterOptions,
}: ClustererProps) => {
  const dimensions = useWindowDimensions()

  const renderItem = useCallback(
    (item: ClusterItem) => (
      <ClusterSwitch
        item={item}
        key={getItemKey(item)}
      />
    ),
    [],
  )

  return (
    <RNClusterer
      data={data}
      mapDimensions={mapDimensions || dimensions}
      options={clusterOptions}
      region={region}
      renderItem={renderItem}
    />
  )
}
