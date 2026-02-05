import {FieldError} from 'react-hook-form'
import {AccessibilityProps} from 'react-native'
import type {IconProps} from '@/components/ui/media/Icon'
import {TopTaskButton} from '@/components/ui/buttons/TopTaskButton'
import {ErrorMessage} from '@/components/ui/forms/ErrorMessage'
import {Column} from '@/components/ui/layout/Column'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {TestProps} from '@/components/ui/types'

type Props = {
  error?: FieldError
  icon: IconProps
  iconRightName?: Extract<SvgIconName, 'chevron-down' | 'chevron-right'>
  onPress: () => void
  text?: string
  textAdditional?: string
  title: string
} & TestProps &
  Pick<
    AccessibilityProps,
    'accessibilityLabel' | 'accessibilityHint' | 'accessibilityValue'
  >

export const SelectButton = ({
  icon,
  testID,
  text,
  textAdditional,
  title,
  error,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  accessibilityValue,
  iconRightName = 'chevron-down',
}: Props) => (
  <Column gutter="md">
    <TopTaskButton
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="combobox"
      accessibilityValue={accessibilityValue}
      border
      icon={icon}
      iconRight={{name: iconRightName, size: 'lg'}}
      onPress={onPress}
      testID={testID}
      text={text}
      textAdditional={textAdditional}
      title={title}
    />
    {!!error && (
      <ErrorMessage
        testID={`${testID}ErrorText`}
        text={error.message ?? ''}
      />
    )}
  </Column>
)
