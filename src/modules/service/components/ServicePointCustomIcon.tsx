import Svg, {Circle, G, Path} from 'react-native-svg'
import type {TestProps} from '@/components/ui/types'
import type {ServiceMapResponseIcon} from '@/modules/service/types'
import type {ComponentType, PropsWithChildren} from 'react'

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
  icon: ServiceMapResponseIcon
  offset?: {x: number; y: number}
  size?: number
} & TestProps

const DEFAULT_WRAPPER = ({children, testID, size}: WrapperProps) => (
  <Svg
    height={size}
    testID={testID}
    viewBox={`0 0 ${size} ${size}`}
    width={size}>
    {children}
  </Svg>
)

export const ServicePointCustomIcon = ({
  Wrapper = DEFAULT_WRAPPER,
  icon: {path_color, path, circle_color},
  testID,
  size = DEFAULT_SIZE,
  offset = DEFAULT_OFFSET,
}: Props) => (
  <Wrapper
    size={size}
    testID={testID}>
    <G transform={`translate(${offset.x}, ${offset.y})`}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        fill={circle_color}
        r={size / 2}
      />
      <Path
        d={path}
        fill={path_color}
        transform={`scale(${size / PATH_SIZE})`}
      />
    </G>
  </Wrapper>
)
