import {useMemo} from 'react'
import type {
  ClusterProperties,
  ClusterItem,
} from '@/components/features/map/types'
import {ClusterMarker} from '@/components/features/map/clusters/ClusterMarker'
import {useMapFilters} from '@/components/features/map/hooks/useMapFilters'
import {getClusterChildren} from '@/components/features/map/utils/getClusterChildren'

export const GroupedClusterMarker = ({
  properties,
  getChildren,
}: {
  getChildren: (id: number) => ClusterItem[]
  properties: ClusterProperties
}) => {
  const {layers} = useMapFilters()

  const clusterGroupedMarkers = useMemo(() => {
    if (!layers?.length) return

    const nestedMarkers = getClusterChildren(properties, getChildren)

    return layers.map(({filter_value, filter_key, color}) => ({
      items: nestedMarkers.filter(
        marker =>
          (marker.properties as Record<string, unknown>)[filter_key] ===
          filter_value,
      ),
      color,
    }))
  }, [properties, getChildren, layers])

  return (
    <ClusterMarker
      count={properties.point_count}
      groupedMarkers={clusterGroupedMarkers}
    />
  )
}
