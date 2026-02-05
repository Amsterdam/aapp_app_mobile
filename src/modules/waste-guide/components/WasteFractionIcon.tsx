import {View} from 'react-native'
import {Circle, Path, Svg} from 'react-native-svg'
import {SvgIconVariant} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {
  fractionIconConfig,
  type FractionIconConfig,
} from '@/modules/waste-guide/constants'
import {FractionCode} from '@/modules/waste-guide/types'
import {sizeTokens, SizeTokens} from '@/themes/tokens/size'
import {useTheme} from '@/themes/useTheme'

export type WasteFractionIconProps = {
  fractionCode: FractionCode
  size?: keyof SizeTokens['waste']['fractionIcon']
}

const iconConfig = fractionIconConfig as Partial<FractionIconConfig>

export const WasteFractionIcon = ({
  fractionCode,
  size = 'md',
}: WasteFractionIconProps) => {
  const {color: colorTokens} = useTheme()
  const {fontScale} = useDeviceContext()
  const scaledSize = sizeTokens.waste.fractionIcon[size] * fontScale

  if (!iconConfig[fractionCode]?.default) {
    return <View style={{height: scaledSize, width: scaledSize}} />
  }

  const {color, hasLightBackground, path} =
    iconConfig[fractionCode][SvgIconVariant.default]

  return (
    <Svg
      fillRule="evenodd"
      height={scaledSize}
      viewBox="0 0 24 24"
      width={scaledSize}>
      <Circle
        cx="12"
        cy="12"
        fill={color}
        r="12"
      />
      <Path
        d={path}
        fill={colorTokens.text[hasLightBackground ? 'default' : 'inverse']}
      />
    </Svg>
  )
}
