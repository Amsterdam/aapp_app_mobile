import {Circle, Path} from 'react-native-svg'
import type {ServiceMapResponseIcon} from '@/modules/service/types'
import {
  MapMarkerBase,
  type MapMarkerBaseProps,
} from '@/components/features/map/marker/MarkerBase'

const RADIUS = 11

/**
 * The dynamic icon paths assume a svg viewbox of 0 0 24 24 (to match other icons in this repo) and therefore has a size of 24.
 */
const ICON_SIZE = 24

/**
 * The MapMarkerBase has a viewbox of 0 0 40 40.
 * X draws the circle from the horizontal center (20), and Y draws it slightly above the vertical center (so as to sit centrally inside the upper part of the base pin)
 */
const OFFSET_CIRCLE = {x: 20, y: 18}

/**
 * The MapMarkerBase has a viewbox of 0 0 40 40, so we need to offset the difference and center the icon inside the Circle.
 */
const OFFSET_CUSTOM_PATH = (scale: number) => ({
  x: OFFSET_CIRCLE.x - (ICON_SIZE * scale) / 2,
  y: OFFSET_CIRCLE.y - (ICON_SIZE * scale) / 2,
})

export const CustomMarker = ({
  icon: {circle_color, path, path_color},
  scale = 1,
  ...props
}: {
  icon: ServiceMapResponseIcon
} & Omit<MapMarkerBaseProps, 'scale'> & {scale?: number}) => (
  <MapMarkerBase {...props}>
    <Circle
      cx={OFFSET_CIRCLE.x}
      cy={OFFSET_CIRCLE.y}
      fill={circle_color}
      r={RADIUS}
    />
    <Path
      d={path}
      fill={path_color}
      transform={`translate(${OFFSET_CUSTOM_PATH(scale).x}, ${OFFSET_CUSTOM_PATH(scale).y}) scale(${scale})`}
    />
  </MapMarkerBase>
)
