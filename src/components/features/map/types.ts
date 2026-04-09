import type {MapMarkerVariant} from '@/components/features/map/marker/MapMarkerVariants'
import type {IconProps} from '@/components/ui/media/Icon'
import type {ReactNode} from 'react'
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
  /**
   * A custom Icon, which will render as a Marker on the Map
   */
  Icon?: ReactNode
  id: string
  onMarkerPress?: () => void
  /**
   * One of the Marker variants within the predefined set @see MapMarkerVariants
   */
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
