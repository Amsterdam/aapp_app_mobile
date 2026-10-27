import {useMemo} from 'react'
import {useClusterSwitch} from '@/components/features/map/hooks/useClusterSwitch'
import {Marker} from '@/components/features/map/marker/Marker'
import type {ClusterItem} from '@/components/features/map/types'
import type {ModuleSlug} from '@/modules/generated/slugs.generated'

type Props = {
  getChildren: (clusterId: number) => ClusterItem[]
  item: ClusterItem
  moduleSlug: ModuleSlug
  shouldGroup?: boolean
}

export const ClusterSwitch = ({
  item,
  shouldGroup,
  getChildren,
  moduleSlug,
}: Props) => {
  const {id, MarkerContent, handlePress} = useClusterSwitch(
    moduleSlug,
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
