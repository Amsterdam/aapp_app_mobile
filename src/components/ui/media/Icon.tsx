import {ComponentType, Fragment} from 'react'
import {View} from 'react-native'
import {Path, Svg, type FillRule} from 'react-native-svg'
import {Rotator} from '@/components/ui/animations/Rotator'
import {
  FILLED_SUFFIX,
  SvgIconName,
  SvgIconsConfig,
  type BaseSvgIconName,
  type SvgIconConfig,
} from '@/components/ui/media/svgIcons'
import {IconSize, SvgIconVariant, TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {devError} from '@/processes/development'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

type AdditionalIconConfig = {
  Wrapper?: ComponentType
  fillRule?: FillRule
  stroke?: boolean
}
const AdditionalIconConfigs: Partial<
  Record<SvgIconName, AdditionalIconConfig>
> = {
  spinner: {Wrapper: Rotator, stroke: false},
  error: {fillRule: 'nonzero'},
}

export type IconProps = {
  /**
   * The color of the icon to display.
   */
  color?: keyof Theme['color']['text']
  'logging-label'?: string
  /**
   * The name of the icon to display.
   */
  name: SvgIconName
  /**
   * The size of the icon.
   */
  size?: keyof typeof IconSize
} & Partial<TestProps>

const DEFAULT_VIEW_BOX = '0 0 24 24'

export const Icon = ({
  color = 'default',
  name,
  size = 'md',
  testID,
  'logging-label': loggingLabel,
}: IconProps) => {
  const {color: colorTokens} = useTheme()
  const {fontScale} = useDeviceContext()
  const scaledSize = IconSize[size] * fontScale

  const iconName = name.replace(FILLED_SUFFIX, '') as BaseSvgIconName
  const isFilled = name.endsWith(FILLED_SUFFIX)

  const iconVariants: Partial<Record<SvgIconVariant, SvgIconConfig>> =
    SvgIconsConfig[iconName]

  const icon =
    iconVariants?.[isFilled ? SvgIconVariant.filled : SvgIconVariant.default]

  const {
    Wrapper = Fragment,
    stroke,
    fillRule = 'evenodd',
  } = AdditionalIconConfigs[iconName] ?? {}

  if (!icon) {
    devError(`Icon with name "${name}" does not exist.`)

    return null
  }

  return (
    <View
      logging-label={loggingLabel}
      testID={testID}>
      <Wrapper>
        <Svg
          fillRule={fillRule}
          height={scaledSize}
          viewBox={'viewBox' in icon ? icon.viewBox : DEFAULT_VIEW_BOX}
          width={scaledSize}>
          <Path
            d={icon.path}
            fill={!stroke ? colorTokens.text[color] : 'none'}
            stroke={stroke ? colorTokens.text[color] : undefined}
          />
        </Svg>
      </Wrapper>
    </View>
  )
}
