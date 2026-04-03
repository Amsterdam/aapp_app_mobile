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

export const MapMarkerDistinctPin = ({
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
    <G clipPath="url(#clip0_6414_6831)">
      <G filter="url(#filter0_d_6414_6831)">
        <Path
          clipRule="evenodd"
          d="M3.33325 20C3.33325 28.1482 14.4444 35.6173 19.9999 38.3333C25.5555 35.6173 36.6666 28.1482 36.6666 20C31.2499 20 14.4444 20 3.33325 20Z"
          fill="white"
          fillRule="evenodd"
        />
        <Circle
          cx={19.9999}
          cy={18.3332}
          fill="white"
          r={16.6667}
        />
      </G>
      <Path
        d="M19.9999 24.1231L14.2104 27.5003L15.1754 20.7459L10.8333 16.4038L17.1052 15.4389L19.9999 9.16699L22.8947 15.4389L29.1666 16.4038L24.8245 20.7459L25.7894 27.5003L19.9999 24.1231Z"
        fill="#004699"
      />
    </G>
    <Defs>
      <Filter
        filterUnits="userSpaceOnUse"
        height={40.667}
        id="filter0_d_6414_6831"
        width={37.3333}
        x={1.33325}
        y={1.6665}>
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
          result="effect1_dropShadow_6414_6831"
        />
        <FeBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_6414_6831"
          mode="normal"
          result="shape"
        />
      </Filter>
      <ClipPath id="clip0_6414_6831">
        <Rect
          fill="white"
          height={40}
          width={40}
        />
      </ClipPath>
    </Defs>
  </Svg>
)
