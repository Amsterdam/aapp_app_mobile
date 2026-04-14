import {useCallback, isValidElement, useMemo} from 'react'
import type {
  ClusterProperties,
  MarkerProperties,
  ClusterItem,
} from '@/components/features/map/types'
import {useIsMarkerSelected} from '@/components/features/map/MapSelectionContext'
import {ClusterMarker} from '@/components/features/map/clusters/ClusterMarker'
import {GroupedClusterMarker} from '@/components/features/map/clusters/GroupedClusterMarker'
import {useMap} from '@/components/features/map/hooks/useMap'
import {
  MapMarkerVariant,
  MapMarkerVariants,
} from '@/components/features/map/marker/MapMarkerVariants'
import {isNearlyEqualFloat} from '@/components/features/map/utils/isNearlyEqualFloat'

export const useClusterSwitch = (
  item: ClusterItem,
  getChildren: (clusterId: number) => ClusterItem[],
  shouldGroup?: boolean,
) => {
  const {map, getCurrentRegion} = useMap()
  const isCluster = 'cluster_id' in item.properties

  const [clusterProps, markerProps] = useMemo(
    () => [
      isCluster ? (item.properties as ClusterProperties) : undefined,
      isCluster ? undefined : (item.properties as MarkerProperties),
    ],
    [isCluster, item],
  )

  const isSelected = useIsMarkerSelected(markerProps?.id)

  const variant = isSelected
    ? MapMarkerVariant.selectedPin
    : markerProps?.variant

  const handlePress = useCallback(() => {
    if ('cluster_id' in item.properties) {
      const {getExpansionRegion} = item.properties

      const expansionRegion = getExpansionRegion()

      const currentRegion = getCurrentRegion()

      const shouldForceZoom =
        !!currentRegion &&
        isNearlyEqualFloat(
          expansionRegion.longitudeDelta,
          currentRegion.longitudeDelta,
          5,
        )

      map?.animateToRegion({
        ...expansionRegion,
        longitudeDelta: shouldForceZoom
          ? expansionRegion.longitudeDelta / 2
          : expansionRegion.longitudeDelta,
      })

      return
    }

    item.properties.onMarkerPress?.()
  }, [item.properties, map, getCurrentRegion])

  const MarkerContent = useCallback(() => {
    if (clusterProps) {
      if (shouldGroup) {
        return (
          <GroupedClusterMarker
            getChildren={getChildren}
            properties={clusterProps}
          />
        )
      } else {
        return <ClusterMarker count={clusterProps.point_count} />
      }
    }

    if (variant) {
      return MapMarkerVariants[variant]
    }

    if (markerProps?.Icon && isValidElement(markerProps.Icon)) {
      return markerProps.Icon
    }

    return null
  }, [variant, markerProps, clusterProps, shouldGroup, getChildren])

  const id = isCluster
    ? `cluster-${clusterProps?.cluster_id}-${clusterProps?.point_count}`
    : `point-${markerProps?.id}-${variant}`

  return {handlePress, MarkerContent, id}
}
