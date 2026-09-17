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
import {devError} from '@/processes/development'
import {
  ExceptionLogKey,
  useTrackException,
} from '@/processes/logging/hooks/useTrackException'

export const useClusterSwitch = (
  item: ClusterItem,
  getChildren: (clusterId: number) => ClusterItem[],
  shouldGroup: boolean = false,
) => {
  const {map, getCurrentRegion} = useMap()

  const [clusterProps, markerProps] = useMemo(() => {
    const isCluster = 'cluster_id' in item.properties

    return [
      isCluster ? (item.properties as ClusterProperties) : undefined,
      isCluster ? undefined : (item.properties as MarkerProperties),
    ]
  }, [item])

  const isSelected = useIsMarkerSelected(markerProps?.id)

  const variant = isSelected
    ? MapMarkerVariant.selectedPin
    : markerProps?.variant
  const trackException = useTrackException()

  const handlePress = useCallback(() => {
    if ('cluster_id' in item.properties) {
      const {getExpansionRegion} = item.properties

      try {
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
      } catch (error) {
        devError('Failed to handle cluster press:', error)
        trackException(
          ExceptionLogKey.mapPressCluster,
          'useClusterSwitch.tsx',
          {
            error,
            clusterId: item.properties.cluster_id,
            coordinates: item.geometry.coordinates,
          },
        )
      }

      return
    }

    item.properties.onMarkerPress?.()
  }, [item, map, getCurrentRegion, trackException])

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

  const id =
    'cluster_id' in item
      ? `cluster-${clusterProps?.cluster_id}-${clusterProps?.point_count}`
      : `point-${markerProps?.id}-${variant}`

  return {handlePress, MarkerContent, id}
}
