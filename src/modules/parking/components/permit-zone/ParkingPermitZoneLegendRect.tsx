import Svg, {Rect} from 'react-native-svg'
import type {PermitZoneFeatureProperties} from '@/modules/parking/types'
import {getPermitZoneFeatureProperties} from '@/modules/parking/utils/getPermitZoneFeatureProperties'

const SIZE = 24
const STROKE_WIDTH = 2

export const ParkingPermitZoneLegendRect = ({
  fill,
}: {
  fill: PermitZoneFeatureProperties['fill']
}) => (
  <Svg
    height={SIZE}
    viewBox="0 0 24 24"
    width={SIZE}>
    <Rect
      height={SIZE - STROKE_WIDTH * 2}
      strokeWidth={STROKE_WIDTH}
      width={SIZE - STROKE_WIDTH * 2}
      x={STROKE_WIDTH}
      y={STROKE_WIDTH}
      {...getPermitZoneFeatureProperties(fill)}
    />
  </Svg>
)
