import React, {useCallback, useMemo} from 'react'
import type {
  ClusterItem,
  ClusterProperties,
  MarkerProperties,
} from '@/components/features/map/types'
import {useIsMarkerSelected} from '@/components/features/map/MapSelectionContext'
import {ClusterMarker} from '@/components/features/map/clusters/ClusterMarker'
import {useMap} from '@/components/features/map/hooks/useMap'
import {
  MapMarkerVariants,
  MapMarkerVariant,
} from '@/components/features/map/marker/MapMarkerVariants'
import {Marker} from '@/components/features/map/marker/Marker'
import {isNearlyEqualFloat} from '@/components/features/map/utils/isNearlyEqualFloat'

export const ClusterSwitch = ({item}: {item: ClusterItem}) => {
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
      return <ClusterMarker count={clusterProps.point_count} />
    }

    if (variant) {
      return MapMarkerVariants[variant]
    }

    if (markerProps?.Icon && React.isValidElement(markerProps.Icon)) {
      return markerProps.Icon
    }

    return null
  }, [variant, clusterProps, markerProps])

  return (
    <Marker
      coordinate={{
        latitude: item.geometry.coordinates[1],
        longitude: item.geometry.coordinates[0],
      }}
      id={
        isCluster
          ? `cluster-${clusterProps?.cluster_id}-${clusterProps?.point_count}`
          : `point-${markerProps?.id}-${variant}`
      }
      onPress={handlePress}
      onSelect={handlePress}>
      <MarkerContent />
    </Marker>
  )
}
