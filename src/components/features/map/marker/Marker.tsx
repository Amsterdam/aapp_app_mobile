import {memo} from 'react'
import {
  // eslint-disable-next-line no-restricted-imports
  Marker as MarkerRN,
  type MapMarkerProps,
  type Point,
} from 'react-native-maps'
import {MarkerVariant} from '@/components/features/map/marker/markers'
import {MARKER_IMAGES} from '@/components/features/map/marker/markers.generated'
import {checkMarkerPropsHaveChanged} from '@/components/features/map/utils/checkMarkerPropsHaveChanged'

const GOOGLE_MAPS_MARKER_OFFSET: Point = {x: 0.25, y: 1}
const APPLE_MAPS_MARKER_OFFSET: Point = {x: 0, y: -20}
const DEFAULT_HIT_SLOP = 20

export type MarkerProps = {
  variant?: MarkerVariant
} & Omit<MapMarkerProps, 'icon' | 'image'>

export const Marker = memo(
  ({variant, hitSlop = DEFAULT_HIT_SLOP, ...markerProps}: MarkerProps) => (
    <MarkerRN
      anchor={GOOGLE_MAPS_MARKER_OFFSET}
      centerOffset={APPLE_MAPS_MARKER_OFFSET}
      hitSlop={hitSlop}
      image={variant ? MARKER_IMAGES[variant] : undefined}
      {...markerProps}
    />
  ),
  checkMarkerPropsHaveChanged,
)
