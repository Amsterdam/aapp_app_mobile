import type {MapMarkerVariant} from '@/components/features/map/marker/MapMarkerVariants'
import type {IconProps} from '@/components/ui/media/Icon'
import type {ReactElement} from 'react'
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

export type MarkerProperties<T = unknown> = {
  /**
   * A custom Icon, which will render as a Marker on the Map
   */
  Icon?: ReactElement
  id: string
  onMarkerPress?: () => void
  /**
   * One of the Marker variants within the predefined set @see MapMarkerVariants
   */
  variant?: MapMarkerVariant
} & T

export type ClusterProperties<T = unknown> = Supercluster.ClusterProperties &
  Supercluster.ClustererClusterProperties &
  T

export type ClusterItem<ExtraProperties = unknown> = {
  geometry: {
    coordinates: number[]
  }
  properties:
    | ClusterProperties<ExtraProperties>
    | MarkerProperties<ExtraProperties>
}
