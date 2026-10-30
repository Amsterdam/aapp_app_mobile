import Svg, {SvgProps, Circle, Path} from 'react-native-svg'

export const WasteCardBluetoothSvg = (props: SvgProps) => (
  <Svg
    fill="none"
    height={86}
    width={68}
    {...props}>
    <Circle
      cx={33}
      cy={65.629}
      r={19.057}
      stroke="#000"
      strokeWidth={2}
    />
    <Circle
      cx={33}
      cy={65.628}
      r={13.486}
      stroke="#000"
      strokeWidth={2}
    />
    <Circle
      cx={33}
      cy={65.629}
      r={7.914}
      stroke="#000"
      strokeWidth={2}
    />
    <Path
      d="m24.714 25.718-10.23-7.44a3 3 0 0 1-1.181-2.993l1.958-10.18a3 3 0 0 1 2.946-2.434h14.705a3 3 0 0 1 2.072.83l9.582 9.147a3 3 0 0 1 .44 3.812L38.054 27.09a3 3 0 0 1-3.206 1.277l-9.064-2.158a3 3 0 0 1-1.07-.492Z"
      fill="#fff"
      stroke="#000"
      strokeWidth={2}
    />
    <Path
      d="M13.66 1.252 4.494 2.78a3 3 0 0 0-2.5 3.173l.721 10.09a3 3 0 0 0 2.993 2.786h5.924a3 3 0 0 0 2.933-2.372l2.496-11.645a2.977 2.977 0 0 0-3.4-3.56ZM25.186 25.065a4 4 0 0 1 2.877-4.87l22.69-5.838a4 4 0 0 1 4.87 2.877l10.042 39.033a4 4 0 0 1-2.877 4.87l-22.69 5.838a4 4 0 0 1-4.87-2.877L25.186 25.065Z"
      fill="#fff"
      stroke="#000"
      strokeWidth={2}
    />
    <Path
      d="M25.2 18.828v-5.571h10.029l5.571 4.457c1.3.929 3.343 3.343 1.114 5.572-2.228 2.228-5.014 1.3-6.128.557L29.1 18.828h-3.9Z"
      fill="#fff"
      stroke="#000"
      strokeWidth={2}
    />
    <Path
      d="M22 9.914h17v5H22z"
      fill="#fff"
    />
  </Svg>
)
