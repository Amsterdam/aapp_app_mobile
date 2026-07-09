import type {MapMarkerVariant} from '@/components/features/map/marker/MapMarkerVariants'
import type {IconProps} from '@/components/ui/media/Icon'
import type {ReactElement} from 'react'
import type {Supercluster} from 'react-native-clusterer'
import {TestProps} from '@/components/ui/types'

export enum ControlVariant {
  layers = 'layers',
  legend = 'legend',
  location = 'location',
}

export enum MapFocus {
  /**
   * Focus on general overview of Amsterdam city centre.
   */
  amsterdam = 'amsterdam',
  /**
   * Focus on a custom region. Use in combination with `initialRegion`.
   */
  specific = 'specific',
  /**
   * Focus on the user's location
   */
  user = 'user',
}

export type MapControlOption = {
  accessibilityLabel: string
  icon: IconProps
  key: ControlVariant
  onPress: () => void
  text?: string
} & TestProps

export type MarkerProperties = {
  /**
   * A custom Icon, which will render as a Marker on the Map
   */
  Icon?: ReactElement
  id: string | number
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
  properties: ClusterProperties | MarkerProperties
}

export type ClusterOptions = Supercluster.Options<
  MarkerProperties | ClusterProperties,
  MarkerProperties | ClusterProperties
>
