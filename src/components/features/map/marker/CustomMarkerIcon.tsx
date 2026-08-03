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
  /**
   * Only decreases when the icon has a circleColor, otherwise the icon is already small enough to fit inside the base pin.
   */
  decreaseIconSize?: boolean
  icon: {
    circleColor?: string
    colors?: string[]
    path: string
    pathColor?: string
  }
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
  decreaseIconSize,
  Wrapper = DEFAULT_WRAPPER,
  icon: {
    pathColor = themes.light.color.text.default,
    path,
    circleColor = 'transparent',
    colors,
  },
  testID,
  size = DEFAULT_SIZE,
  offset = DEFAULT_OFFSET,
}: Props) => {
  const center = size / ((size / PATH_SIZE) * 2)
  const gradientColors = colors?.length ? colors : []
  const shouldDecreaseIconSize =
    decreaseIconSize &&
    circleColor !== 'transparent' &&
    gradientColors.length === 0
  const gTransform = shouldDecreaseIconSize
    ? `scale(0.8) translate(${offset.x + 5}, ${offset.y + 5})`
    : `translate(${offset.x}, ${offset.y})`
  const circleR = shouldDecreaseIconSize ? center + 3 : center

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
          {gradientColors.map((color, index) => (
            <Stop
              key={`${color}-${index}`}
              //intentionally using index + 1 to avoid having a stop at 0% and 100% which would make the gradient not visible
              offset={`${((index + 1) / (gradientColors.length + 1)) * 100}%`}
              stopColor={color}
            />
          ))}
        </LinearGradient>
      </Defs>
      <G transform={gTransform}>
        <Circle
          cx={center}
          cy={center}
          fill={
            colors?.length ? 'url(#markerCircleRainbowGradient)' : circleColor
          }
          r={circleR}
        />
        <Path
          d={path}
          fill={pathColor}
        />
      </G>
    </Wrapper>
  )
}
