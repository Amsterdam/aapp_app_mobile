import {useCallback} from 'react'
import {useWindowDimensions} from 'react-native'
import {useClusterer, type Supercluster} from 'react-native-clusterer'
import type {
  ClusterItem,
  ClusterProperties,
  MarkerProperties,
} from '@/components/features/map/types'
import type {MapMarkerProps, Region} from 'react-native-maps'
import {ClusterSwitch} from '@/components/features/map/clusters/ClusterSwitch'
import {
  AMSTERDAM_REGION,
  DEFAULT_CLUSTER_OPTIONS,
} from '@/components/features/map/constants'

export type ClustererProps = {
  clusterOptions?: Supercluster.Options<
    MarkerProperties | ClusterProperties,
    MarkerProperties | ClusterProperties
  >
  data: Supercluster.PointFeature<MarkerProperties>[]
  mapDimensions?: {height: number; width: number}
  region?: Region
  shouldGroup?: boolean
} & Omit<MapMarkerProps, 'coordinate'>

const getItemKey = (item: ClusterItem) =>
  'cluster_id' in item.properties
    ? `cluster-${item.properties?.cluster_id}-${item.properties.point_count}`
    : `point-${item.properties?.id}`

export const Clusterer = ({
  data,
  region = AMSTERDAM_REGION,
  mapDimensions,
  shouldGroup = false,
  clusterOptions = DEFAULT_CLUSTER_OPTIONS,
}: ClustererProps) => {
  const dimensions = useWindowDimensions()

  const [points, supercluster] = useClusterer(
    data,
    mapDimensions || dimensions,
    region,
    clusterOptions,
  )

  const renderItem = useCallback(
    (item: ClusterItem) => (
      <ClusterSwitch
        getChildren={(id: number) => {
          try {
            return supercluster.getChildren(id)
          } catch {
            return []
          }
        }}
        item={item}
        key={getItemKey(item)}
        shouldGroup={shouldGroup}
      />
    ),
    [supercluster, shouldGroup],
  )

  return points.map(renderItem)
}
