import type {ClusterOptions} from '@/components/features/map/types'
import type {Region} from 'react-native-maps'

export const AMSTERDAM_REGION: Region = {
  latitude: 52.3753,
  longitude: 4.8964,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

export const USER_LOCATION_DELTA = 0.01

export const ANIMATION_DURATION = 0

export const DEFAULT_CLUSTER_OPTIONS: ClusterOptions = {
  minZoom: 0,
  maxZoom: 16,
  minPoints: 2,
  radius: 30,
  extent: 512,
}

export const HIGH_DATA_COUNT_CLUSTER_OPTIONS: ClusterOptions = {
  ...DEFAULT_CLUSTER_OPTIONS,
  maxZoom: 14,
  radius: 50,
}
