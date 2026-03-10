import {ComponentType, Fragment} from 'react'
import {View} from 'react-native'
import {Path, Svg, type FillRule} from 'react-native-svg'
import {Rotator} from '@/components/ui/animations/Rotator'
import {
  SvgIconName,
  SvgIconsConfig,
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
  isFilled?: boolean
  'logging-label'?: string
  /**
   * The name of the icon to display.
   */
  name: SvgIconName
  path?: never
  /**
   * The size of the icon.
   */
  size?: keyof typeof IconSize
} & Partial<TestProps>

type ExternalIconProps = Omit<IconProps, 'name' | 'isFilled' | 'path'> & {
  isFilled?: never
  name?: never
  /**
   * Svg icon path data.
   */
  path: string
}

const DEFAULT_VIEW_BOX = '0 0 24 24'

export const Icon = ({
  color = 'default',
  size = 'md',
  testID,
  'logging-label': loggingLabel,
  ...rest
}: IconProps | ExternalIconProps) => {
  const {color: colorTokens} = useTheme()
  const {fontScale} = useDeviceContext()
  const scaledSize = IconSize[size] * fontScale

  const {name, path, isFilled = false} = rest

  const iconVariants: Partial<Record<SvgIconVariant, SvgIconConfig>> = name
    ? SvgIconsConfig[name]
    : {[SvgIconVariant.default]: {path}}

  const icon =
    iconVariants?.[isFilled ? SvgIconVariant.filled : SvgIconVariant.default]

  const {
    Wrapper = Fragment,
    stroke,
    fillRule = 'evenodd',
  } = (name && AdditionalIconConfigs[name]) || {}

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
