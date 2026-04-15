import {useMemo, type PropsWithChildren} from 'react'
import {View, StyleSheet} from 'react-native'
import Svg, {Circle, G} from 'react-native-svg'

const RADIUS = 50
const STROKE_WIDTH = RADIUS / 5
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

type PieSlice = {
  color: string
  offset: number
  percentage: number
}

type PieProps = PropsWithChildren<{
  data: Omit<PieSlice, 'offset'>[]
  size: number
}>

export const Pie = ({children, size, data = []}: PieProps) => {
  const slices: PieSlice[] = useMemo(() => {
    let offset = 0

    return data.map(slice => {
      const sliceOffset = offset

      offset += slice.percentage

      return {...slice, offset: sliceOffset}
    })
  }, [data])

  return (
    <Svg
      height={size}
      viewBox="0 0 120 120"
      width={size}>
      <G transform="rotate(-90 60 60)">
        {slices.map(slice => (
          <PieSlice
            {...slice}
            key={slice.color}
            radius={RADIUS}
            strokeWidth={STROKE_WIDTH}
          />
        ))}
      </G>

      <View style={styles.center}>{children}</View>
    </Svg>
  )
}

type PieSliceProps = PieSlice & {
  radius: number
  strokeWidth: number
}

const PieSlice = ({
  radius,
  strokeWidth,
  percentage = 1,
  offset = 0,
  color,
}: PieSliceProps) => (
  <Circle
    cx="60"
    cy="60"
    fill="none"
    r={radius}
    stroke={color}
    strokeDasharray={`${percentage * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
    strokeWidth={strokeWidth}
    transform={`rotate(${360 * offset}, 60 60)`}
  />
)

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
