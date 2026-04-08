import Svg, {G, Path, SvgProps, PathProps} from 'react-native-svg'

const DEFAULT_SIZE = 40
const DEFAULT_DROP_SHADOW_OFFSET = 3

export type MapMarkerBaseProps = Omit<
  SvgProps,
  'translateY' | 'translateX' | 'translate' | 'transform'
> & {translateY: number}

export const MapMarkerBase = ({
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  translateY = DEFAULT_DROP_SHADOW_OFFSET,
  children,
  ...props
}: MapMarkerBaseProps) => (
  <Svg
    fill="none"
    height={height}
    viewBox="0 0 40 40"
    width={width}
    {...props}>
    <MapMarkerBaseDropShadow translateY={translateY} />
    <MapMarkerBasePin fill="white" />
    {children}
  </Svg>
)

const MapMarkerBasePin = (props: Omit<PathProps, 'd'>) => (
  <Path
    d="M20.0005 1.81836C29.0621 1.81845 36.4075 9.21835 36.4077 18.3467C36.4077 18.9045 36.3802 19.4563 36.3267 20H36.4077C36.4077 22.0205 35.7241 23.9989 34.6128 25.8721C33.3736 28.3092 31.5506 30.3944 29.3306 31.9434C26.1194 34.7462 22.4928 36.9542 20.0005 38.1816C17.508 36.9541 13.8807 34.7464 10.6694 31.9434C8.44742 30.3929 6.6225 28.3053 5.3833 25.8652C4.27447 23.9941 3.59229 22.018 3.59229 20H3.67432C3.62073 19.4563 3.59229 18.9045 3.59229 18.3467C3.59253 9.2183 10.9388 1.81836 20.0005 1.81836Z"
    {...props}
  />
)

const MapMarkerBaseDropShadow = ({
  translateY,
}: Pick<MapMarkerBaseProps, 'translateY'>) => (
  <G transform={`translate(0, ${translateY})`}>
    <MapMarkerBasePin
      fill="black"
      opacity={0.15}
      transform={`translate(0, -${(translateY / 3) * 2})`}
    />
    <MapMarkerBasePin
      fill="black"
      opacity={0.1}
      transform={`translate(0, -${translateY / 3})`}
    />
    <MapMarkerBasePin
      fill="black"
      opacity={0.01}
    />
  </G>
)
