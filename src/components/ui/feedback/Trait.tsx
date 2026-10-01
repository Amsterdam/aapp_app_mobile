import {ReactNode} from 'react'
import {TextProps} from 'react-native'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Phrase} from '@/components/ui/text/Phrase'
import {type TestProps} from '@/components/ui/types'

type Props = {
  /**
   * Allows a custom visualization for the trait.
   * Use a small component here. Not rendered if an icon name is provided.
   */
  children?: ReactNode
  /**
   * The name of the icon to visually support the trait label.
   */
  iconName?: SvgIconName
  /**
   * The label identifying the trait.
   * Should be one or a few words.
   */
  label: string
} & Pick<
  TextProps,
  'accessibilityLabel' | 'accessibilityLanguage' | 'accessible'
> &
  TestProps

export const Trait = ({
  accessible = true,
  accessibilityLabel,
  accessibilityLanguage = 'nl-NL',
  children,
  iconName,
  label,
  testID,
}: Props) => (
  <Row gutter="sm">
    {iconName ? (
      <Icon
        name={iconName}
        testID={`${testID}Icon`}
      />
    ) : (
      children
    )}
    <Phrase
      accessibilityLabel={accessibilityLabel}
      accessibilityLanguage={accessibilityLanguage}
      accessible={accessible}
      testID={`${testID}Label`}
      variant="small">
      {label}
    </Phrase>
  </Row>
)
