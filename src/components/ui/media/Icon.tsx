import {ComponentType, Fragment} from 'react'
import {View} from 'react-native'
import {Path, Svg} from 'react-native-svg'
import {Rotator} from '@/components/ui/animations/Rotator'
import {
  SvgIconName,
  SvgIconsConfig,
  type SvgIconConfig,
} from '@/components/ui/media/svgIcons'
import {IconSize, TestProps} from '@/components/ui/types'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {devError, devLog} from '@/processes/development'
import {Theme} from '@/themes/themes'
import {useTheme} from '@/themes/useTheme'

const DEFAULT_STROKE_WIDTH = 3

type AdditionalIconConfig = {
  Wrapper?: ComponentType
  stroke: boolean
  strokeWidth?: number
}
const AdditionalIconConfigs: Partial<
  Record<SvgIconName, AdditionalIconConfig>
> = {
  spinner: {Wrapper: Rotator, stroke: true},
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
  const icon: SvgIconConfig | undefined = SvgIconsConfig[name]

  const {
    Wrapper = Fragment,
    stroke,
    strokeWidth = DEFAULT_STROKE_WIDTH,
  } = AdditionalIconConfigs[name] ?? {}

  if (!icon) {
    devError(`Icon with name "${name}" does not exist.`)

    return null
  }

  if (/[A-Z]/.test(name)) {
    devLog(`Please use kebab casing for ${name}.`)
  }

  if (icon.viewBox) {
    devLog(`Please use the default 24x24 viewbox for ${name}.`)
  }

  return (
    <View
      logging-label={loggingLabel}
      testID={testID}>
      <Wrapper>
        <Svg
          fillRule="evenodd"
          height={scaledSize}
          viewBox={'viewBox' in icon ? icon.viewBox : DEFAULT_VIEW_BOX}
          width={scaledSize}>
          <Path
            d={icon.path}
            fill={!stroke ? colorTokens.text[color] : 'none'}
            stroke={stroke ? colorTokens.text[color] : undefined}
            strokeWidth={stroke ? strokeWidth : undefined}
          />
        </Svg>
      </Wrapper>
    </View>
  )
}
