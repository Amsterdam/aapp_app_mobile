import type {MapMarkerVariant} from '@/components/features/map/marker/MapMarkerVariants'
import type {IconProps} from '@/components/ui/media/Icon'
import type {Supercluster} from 'react-native-clusterer'
import {TestProps} from '@/components/ui/types'

export enum ControlVariant {
  legend = 'legend',
  location = 'location',
}

export type MapControlOption = {
  accessibilityLabel: string
  icon: IconProps
  key: ControlVariant
  onPress: () => void
} & TestProps

export type MarkerProperties = {
  id: string
  onMarkerPress?: () => void
  variant?: MapMarkerVariant
}

export type ClusterProperties = Supercluster.ClusterProperties &
  Supercluster.ClustererClusterProperties

export type ClusterItem = {
  geometry: {
    coordinates: number[]
  }
  properties: MarkerProperties | ClusterProperties
}
