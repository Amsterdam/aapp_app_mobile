import {memo, type Ref} from 'react'
import {
  // eslint-disable-next-line no-restricted-imports
  Marker as MarkerRN,
  type MapMarker,
  type MapMarkerProps,
  type Point,
} from 'react-native-maps'
import {checkMarkerPropsHaveChanged} from '@/components/features/map/utils/checkMarkerPropsHaveChanged'

const MARKER_ANCHOR: Point = {x: 0.5, y: 1}
const DEFAULT_HIT_SLOP = 20

export type MarkerProps = Omit<
  MapMarkerProps,
  'icon' | 'image' | 'tracksViewChanges'
> & {ref?: Ref<MapMarker>}

export const Marker = memo(
  ({hitSlop = DEFAULT_HIT_SLOP, ...markerProps}: MarkerProps) => (
    <MarkerRN
      anchor={MARKER_ANCHOR}
      hitSlop={hitSlop}
      tracksViewChanges={false}
      {...markerProps}
    />
  ),
  checkMarkerPropsHaveChanged,
)
