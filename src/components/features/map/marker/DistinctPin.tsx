import Svg, {
  Circle,
  Defs,
  FeBlend,
  FeColorMatrix,
  FeComposite,
  FeFlood,
  FeGaussianBlur,
  FeOffset,
  Filter,
  G,
  Path,
  SvgProps,
} from 'react-native-svg'

const DEFAULT_WIDTH = 38
const DEFAULT_HEIGHT = 39

export const DistinctPin = ({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  ...props
}: SvgProps) => (
  <Svg
    fill="none"
    height={height}
    viewBox="0 0 38 39"
    width={width}
    {...props}>
    <G filter="url(#filter0_d_8082_2266)">
      <Path
        clipRule="evenodd"
        d="M2 18.3335C2 26.4816 13.1111 33.9508 18.6667 36.6668C24.2222 33.9508 35.3333 26.4816 35.3333 18.3335C29.9167 18.3335 13.1111 18.3335 2 18.3335Z"
        fill="white"
        fillRule="evenodd"
      />
      <Circle
        cx={18.6667}
        cy={16.6667}
        fill="white"
        r={16.6667}
      />
    </G>
    <Defs>
      <Filter
        filterUnits="userSpaceOnUse"
        height={40.667}
        id="filter0_d_8082_2266"
        width={37.3334}
        x={0}
        y={0}>
        <FeFlood
          floodOpacity={0}
          result="BackgroundImageFix"
        />
        <FeColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <FeOffset dy={2} />
        <FeGaussianBlur stdDeviation={1} />
        <FeComposite
          in2="hardAlpha"
          operator="out"
        />
        <FeColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <FeBlend
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow_8082_2266"
        />
        <FeBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_8082_2266"
          mode="normal"
          result="shape"
        />
      </Filter>
    </Defs>
  </Svg>
)
