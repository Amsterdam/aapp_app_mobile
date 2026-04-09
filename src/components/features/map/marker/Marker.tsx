import {memo} from 'react'
import {Platform} from 'react-native'
import {
  // eslint-disable-next-line no-restricted-imports
  Marker as MarkerRN,
  type MapMarkerProps,
  type Point,
} from 'react-native-maps'
import {checkMarkerPropsHaveChanged} from '@/components/features/map/utils/checkMarkerPropsHaveChanged'

const MARKER_ANCHOR: Point = {x: 0.5, y: 1}
const DEFAULT_HIT_SLOP = 20

export type MarkerProps = Omit<
  MapMarkerProps,
  'icon' | 'image' | 'tracksViewChanges'
>

export const Marker = memo(
  ({hitSlop = DEFAULT_HIT_SLOP, ...markerProps}: MarkerProps) => (
    <MarkerRN
      anchor={MARKER_ANCHOR}
      hitSlop={hitSlop}
      tracksViewChanges={Platform.OS === 'android'}
      {...markerProps}
    />
  ),
  checkMarkerPropsHaveChanged,
)
