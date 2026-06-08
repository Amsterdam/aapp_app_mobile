import Svg, {Circle} from 'react-native-svg'
import {useTheme} from '@/themes/useTheme'

export const LiveblogDot = () => {
  const theme = useTheme()

  return (
    <Svg
      height={10}
      viewBox="0 0 10 10"
      width={10}>
      <Circle
        cx={5}
        cy={5}
        fill={theme.color.text.warning}
        r={5}
      />
    </Svg>
  )
}
