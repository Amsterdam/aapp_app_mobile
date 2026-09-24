import {useMemo} from 'react'
import {StyleSheet} from 'react-native'
import {Path, Svg} from 'react-native-svg'
import {PointerDimension} from '@/components/ui/feedback/tooltip/types'
import {Direction} from '@/components/ui/types'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  direction: Direction
  height?: number
  width?: number
}

export const Triangle = ({
  direction,
  height = PointerDimension.height,
  width = PointerDimension.width,
}: Props) => {
  const iconProps = useThemable(createIconProps)
  const viewBox = [Direction.up, Direction.down].includes(direction)
    ? `0 0 ${width} ${height}`
    : `0 0 ${height} ${width}`

  const path: Record<Direction, string> = useMemo(
    () => ({
      [Direction.up]: `M ${width / 2} 0 L ${width} ${height} L 0 ${height} L ${width / 2} 0`,
      [Direction.down]: `M ${width / 2} ${height} L 0 0 L ${width} 0 L ${width / 2} ${height}`,
      [Direction.left]: `M 0 ${width / 2} L ${height} 0 L ${height} ${width} L 0 ${width / 2}`,
      [Direction.right]: `M ${height} ${width / 2} L 0 0 L 0 ${width} L ${height} ${width / 2}`,
    }),
    [height, width],
  )

  return (
    <Svg
      height={height}
      style={styles.svg}
      viewBox={viewBox}
      width={width}>
      {!!path[direction] && (
        <Path
          d={path[direction]}
          {...iconProps}
        />
      )}
    </Svg>
  )
}

const createIconProps = ({color}: Theme) => ({
  fill: color.tooltip.background,
})

const styles = StyleSheet.create({
  svg: {
    margin: -0.5 /* Works around visual disconnects in zoom scenarios */,
  },
})
