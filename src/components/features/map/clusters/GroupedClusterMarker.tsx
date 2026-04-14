import {useMemo} from 'react'
import type {
  ClusterProperties,
  ClusterItem,
} from '@/components/features/map/types'
import {ClusterMarker} from '@/components/features/map/clusters/ClusterMarker'
import {getClusterChildren} from '@/components/features/map/utils/getClusterChildren'
import {groupByKey} from '@/utils/object'

export const GroupedClusterMarker = ({
  properties,
  getChildren,
}: {
  getChildren: (id: number) => ClusterItem[]
  properties: ClusterProperties
}) => {
  const clusterGroupedMakers = useMemo(() => {
    if (!properties || !('cluster_id' in properties)) {
      return
    }

    const nestedMarkers = getClusterChildren(properties, getChildren)

    return groupByKey(
      nestedMarkers as ClusterItem<{aapp_subtitle: string}>[],
      marker => marker.properties.aapp_subtitle,
    )
  }, [properties, getChildren])

  return (
    <ClusterMarker
      count={properties.point_count}
      groupedMarkers={clusterGroupedMakers}
    />
  )
}
