import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg'
import type {TestProps} from '@/components/ui/types'
import type {ComponentType, PropsWithChildren} from 'react'
import {themes} from '@/themes/themes'

/**
 * Default icon size
 */
const DEFAULT_SIZE = 24

/**
 * The dynamic icon paths assume a svg viewbox of 0 0 24 24 (to match other icons in this repo) and therefore has a size of 24.
 */
const PATH_SIZE = 24

const DEFAULT_OFFSET = {x: 0, y: 0}

type WrapperProps = PropsWithChildren<TestProps & {size?: number}>

type Props = {
  Wrapper?: ComponentType<WrapperProps>
  icon: {circleColor?: string; path: string; pathColor?: string}
  offset?: {x: number; y: number}
  size?: number
} & TestProps

const DEFAULT_WRAPPER = ({children, testID, size}: WrapperProps) => (
  <Svg
    height={size}
    testID={testID}
    viewBox="0 0 24 24"
    width={size}>
    {children}
  </Svg>
)

export const CustomMarkerIcon = ({
  Wrapper = DEFAULT_WRAPPER,
  icon: {
    pathColor = themes.light.color.text.default,
    path,
    circleColor = 'transparent',
  },
  testID,
  size = DEFAULT_SIZE,
  offset = DEFAULT_OFFSET,
}: Props) => {
  const center = size / ((size / PATH_SIZE) * 2)
  const isRainbowCircle = circleColor === 'rainbow'

  return (
    <Wrapper
      size={size}
      testID={testID}>
      <Defs>
        <LinearGradient
          id="markerCircleRainbowGradient"
          x1="0%"
          x2="100%"
          y1="0%"
          y2="100%">
          <Stop
            offset="0%"
            stopColor="#ff0000"
          />
          <Stop
            offset="20%"
            stopColor="#ff0000"
          />
          <Stop
            offset="40%"
            stopColor="#ffc400"
          />
          <Stop
            offset="60%"
            stopColor="#00bf07"
          />
          <Stop
            offset="80%"
            stopColor="#004ffb"
          />
          <Stop
            offset="100%"
            stopColor="#004ffb"
          />
        </LinearGradient>
      </Defs>
      <G transform={`translate(${offset.x}, ${offset.y})`}>
        <Circle
          cx={center}
          cy={center}
          fill={
            isRainbowCircle ? 'url(#markerCircleRainbowGradient)' : circleColor
          }
          r={center}
        />
        <Path
          d={path}
          fill={pathColor}
        />
      </G>
    </Wrapper>
  )
}
