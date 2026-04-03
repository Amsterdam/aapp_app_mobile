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

export const MapMarkerElectionsCrowdUnknownPin = ({
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
    <G clipPath="url(#clip0_10147_3116)">
      <G filter="url(#filter0_d_10147_3116)">
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
      <G clipPath="url(#clip1_10147_3116)">
        <Circle
          cx={20.3336}
          cy={18}
          fill="#767676"
          r={10.6944}
        />
        <Path
          d="M22.9169 18C22.9169 16.3892 21.6111 15.0833 20.0003 15.0833C18.3894 15.0833 17.0836 16.3892 17.0836 18C17.0836 19.6108 18.3894 20.9167 20.0003 20.9167V22.8611C17.3156 22.8611 15.1392 20.6847 15.1392 18C15.1392 15.3153 17.3156 13.1389 20.0003 13.1389C22.685 13.1389 24.8614 15.3153 24.8614 18C24.8614 20.6847 22.685 22.8611 20.0003 22.8611V20.9167C21.6111 20.9167 22.9169 19.6108 22.9169 18Z"
          fill="white"
        />
      </G>
    </G>
    <Defs>
      <Filter
        filterUnits="userSpaceOnUse"
        height={40.6667}
        id="filter0_d_10147_3116"
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
          result="effect1_dropShadow_10147_3116"
        />
        <FeBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_10147_3116"
          mode="normal"
          result="shape"
        />
      </Filter>
      <ClipPath id="clip0_10147_3116">
        <Rect
          fill="white"
          height={40}
          width={40}
        />
      </ClipPath>
      <ClipPath id="clip1_10147_3116">
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
