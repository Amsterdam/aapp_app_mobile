import {useCallback} from 'react'
import type {ClusterItem} from '@/components/features/map/types'
import {ClusterMarker} from '@/components/features/map/clusters/ClusterMarker'
import {useMap} from '@/components/features/map/hooks/useMap'
import {Marker} from '@/components/features/map/marker/Marker'
import {isNearlyEqualFloat} from '@/components/features/map/utils/isNearlyEqualFloat'

export const ClusterSwitch = ({item}: {item: ClusterItem}) => {
  const {map, getCurrentRegion} = useMap()

  const handlePress = useCallback(() => {
    if ('cluster_id' in item.properties) {
      const {getExpansionRegion} = item.properties

      const expansionRegion = getExpansionRegion()

      const currentRegion = getCurrentRegion()

      const shouldForceZoom =
        !!currentRegion &&
        isNearlyEqualFloat(
          expansionRegion.longitudeDelta,
          currentRegion?.longitudeDelta,
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
        'cluster_id' in item.properties
          ? `cluster-${item.properties?.cluster_id}-${item.properties.point_count}`
          : `point-${item.properties?.id}`
      }
      onPress={handlePress}
      onSelect={handlePress}
      tracksViewChanges={false}
      variant={
        'cluster_id' in item.properties ? undefined : item.properties.variant
      }>
      {'cluster_id' in item.properties && (
        <ClusterMarker count={item.properties.point_count} />
      )}
    </Marker>
  )
}
