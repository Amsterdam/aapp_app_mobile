import Svg, {
  Circle,
  ClipPath,
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
  Rect,
  SvgProps,
} from 'react-native-svg'

const DEFAULT_SIZE = 40

export const ElectionsCrowdBusyPin = ({
  width = DEFAULT_SIZE,
  height = DEFAULT_SIZE,
  ...props
}: SvgProps) => (
  <Svg
    fill="none"
    height={height}
    viewBox="0 0 40 40"
    width={width}
    {...props}>
    <G clipPath="url(#clip0_10147_3069)">
      <G filter="url(#filter0_d_10147_3069)">
        <Path
          clipRule="evenodd"
          d="M3.3335 20C3.3335 28.1482 14.4446 35.6173 20.0002 38.3333C25.5557 35.6173 36.6668 28.1482 36.6668 20C31.2502 20 14.4446 20 3.3335 20Z"
          fill="white"
          fillRule="evenodd"
        />
        <Circle
          cx={20.0002}
          cy={18.3333}
          fill="white"
          r={16.6667}
        />
      </G>
      <G clipPath="url(#clip1_10147_3069)">
        <Circle
          cx={20.3336}
          cy={18}
          fill="#EC0000"
          r={10.6944}
        />
        <Circle
          cx={14.1666}
          cy={18}
          fill="white"
          r={1.94444}
        />
        <Circle
          cx={20.0001}
          cy={18}
          fill="white"
          r={1.94444}
        />
        <Circle
          cx={25.8336}
          cy={18}
          fill="white"
          r={1.94444}
        />
      </G>
    </G>
    <Defs>
      <Filter
        filterUnits="userSpaceOnUse"
        height={40.6667}
        id="filter0_d_10147_3069"
        width={37.3335}
        x={1.3335}
        y={1.66666}>
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
          result="effect1_dropShadow_10147_3069"
        />
        <FeBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_10147_3069"
          mode="normal"
          result="shape"
        />
      </Filter>
      <ClipPath id="clip0_10147_3069">
        <Rect
          fill="white"
          height={40}
          width={40}
        />
      </ClipPath>
      <ClipPath id="clip1_10147_3069">
        <Rect
          fill="white"
          height={23.3333}
          transform="translate(8.3335 6.33334)"
          width={23.3333}
        />
      </ClipPath>
    </Defs>
  </Svg>
)
