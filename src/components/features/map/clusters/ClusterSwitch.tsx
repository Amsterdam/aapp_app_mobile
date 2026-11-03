import {useMemo} from 'react'
import {useClusterSwitch} from '@/components/features/map/hooks/useClusterSwitch'
import type {MapIdentifier} from '@/components/features/map/MapSelectionContext'
import {Marker} from '@/components/features/map/marker/Marker'
import type {ClusterItem} from '@/components/features/map/types'

type Props = {
  getChildren: (clusterId: number) => ClusterItem[]
  item: ClusterItem
  /**
   * Identifier used for storing and keeping track of marker selected states
   */
  mapIdentifier: MapIdentifier
  shouldGroup?: boolean
}

export const ClusterSwitch = ({
  item,
  shouldGroup,
  getChildren,
  mapIdentifier,
}: Props) => {
  const {id, MarkerContent, handlePress} = useClusterSwitch(
    mapIdentifier,
    item,
    getChildren,
    shouldGroup,
  )

  const markerChildren = useMemo(() => <MarkerContent />, [MarkerContent])

  return (
    <Marker
      coordinate={{
        latitude: item.geometry.coordinates[1],
        longitude: item.geometry.coordinates[0],
      }}
      id={id}
      key={id}
      onPress={handlePress}
      onSelect={handlePress}
      zIndex={2}>
      {markerChildren}
    </Marker>
  )
}
