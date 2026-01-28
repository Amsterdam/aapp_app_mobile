import type {MarkerVariant} from '@/components/features/map/marker/markers.generated'
import type {Supercluster} from 'react-native-clusterer'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {TestProps} from '@/components/ui/types'

export enum ControlVariant {
  legend = 'legend',
  location = 'location',
}

export type MapControlOption = {
  accessibilityLabel: string
  iconName: SvgIconName
  key: ControlVariant
  onPress: () => void
} & TestProps

export type MarkerProperties = {
  id: string
  onMarkerPress?: () => void
  variant?: MarkerVariant
}

export type ClusterProperties = Supercluster.ClusterProperties &
  Supercluster.ClustererClusterProperties

export type ClusterItem = {
  geometry: {
    coordinates: number[]
  }
  properties: MarkerProperties | ClusterProperties
}
