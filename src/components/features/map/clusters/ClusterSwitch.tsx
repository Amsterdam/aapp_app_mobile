import {useMemo} from 'react'
import type {ClusterItem} from '@/components/features/map/types'
import {useClusterSwitch} from '@/components/features/map/hooks/useClusterSwitch'
import {Marker} from '@/components/features/map/marker/Marker'

type Props = {
  getChildren: (clusterId: number) => ClusterItem[]
  item: ClusterItem
  shouldGroup?: boolean
}

export const ClusterSwitch = ({item, shouldGroup, getChildren}: Props) => {
  const {id, MarkerContent, handlePress} = useClusterSwitch(
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
      onPress={handlePress}
      onSelect={handlePress}
      zIndex={2}>
      {markerChildren}
    </Marker>
  )
}
