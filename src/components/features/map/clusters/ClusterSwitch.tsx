import {useCallback} from 'react'
import {Platform} from 'react-native'
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
  const clusterProps = isCluster
    ? (item.properties as ClusterProperties)
    : undefined
  const markerProps = isCluster
    ? undefined
    : (item.properties as MarkerProperties)

  const isSelected = useIsMarkerSelected(markerProps?.id)

  const variant = markerProps
    ? isSelected
      ? MapMarkerVariant.selectedPin
      : markerProps.variant
    : undefined

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
      onSelect={handlePress}
      tracksViewChanges={Platform.OS === 'android'}>
      {clusterProps ? (
        <ClusterMarker count={clusterProps.point_count} />
      ) : variant ? (
        MapMarkerVariants[variant]
      ) : null}
    </Marker>
  )
}
