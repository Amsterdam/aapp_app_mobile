import {StyleSheet} from 'react-native'
import Svg, {Rect} from 'react-native-svg'
import type {PermitZoneFeatureProperties} from '@/modules/parking/types'
import {IconSize} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {getPermitZoneFeatureProperties} from '@/modules/parking/utils/getPermitZoneFeatureProperties'

const SIZE = 'lg' // 24
const STROKE_WIDTH = 2

export const ParkingPermitZoneLegendRect = ({
  fill,
  size = SIZE,
}: {
  fill: PermitZoneFeatureProperties['fill']
  size?: keyof typeof IconSize
}) => {
  const {fontScale} = useDeviceContext()
  const scaledSize = IconSize[size] * fontScale

  return (
    <Svg
      height={scaledSize}
      style={styles.center}
      viewBox="0 0 24 24"
      width={scaledSize}>
      <Rect
        {...getPermitZoneFeatureProperties(fill)}
        height={22}
        strokeWidth={STROKE_WIDTH}
        width={22}
        x={STROKE_WIDTH / 2}
        y={STROKE_WIDTH / 2}
      />
    </Svg>
  )
}

const styles = StyleSheet.create({
  center: {
    alignSelf: 'center',
  },
})
