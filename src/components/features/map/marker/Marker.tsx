import {memo} from 'react'
import {
  // eslint-disable-next-line no-restricted-imports
  Marker as MarkerRN,
  type MapMarkerProps,
  type Point,
} from 'react-native-maps'
import {checkMarkerPropsHaveChanged} from '@/components/features/map/utils/checkMarkerPropsHaveChanged'

const GOOGLE_MAPS_MARKER_OFFSET: Point = {x: 0.25, y: 1}
const APPLE_MAPS_MARKER_OFFSET: Point = {x: 0, y: -20}
const DEFAULT_HIT_SLOP = 20

export type MarkerProps = Omit<MapMarkerProps, 'icon' | 'image'>

export const Marker = memo(
  ({hitSlop = DEFAULT_HIT_SLOP, ...markerProps}: MarkerProps) => (
    <MarkerRN
      anchor={GOOGLE_MAPS_MARKER_OFFSET}
      centerOffset={APPLE_MAPS_MARKER_OFFSET}
      hitSlop={hitSlop}
      {...markerProps}
    />
  ),
  checkMarkerPropsHaveChanged,
)
