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

export const MapMarkerPin = ({
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
    <G clipPath="url(#clip0_10147_3685)">
      <G filter="url(#filter0_d_10147_3685)">
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
      <Circle
        cx={20.3334}
        cy={18}
        fill="#181818"
        r={8.75}
      />
    </G>
    <Defs>
      <Filter
        filterUnits="userSpaceOnUse"
        height={40.667}
        id="filter0_d_10147_3685"
        width={37.3334}
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
          result="effect1_dropShadow_10147_3685"
        />
        <FeBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_10147_3685"
          mode="normal"
          result="shape"
        />
      </Filter>
      <ClipPath id="clip0_10147_3685">
        <Rect
          fill="white"
          height={40}
          width={40}
        />
      </ClipPath>
    </Defs>
  </Svg>
)
