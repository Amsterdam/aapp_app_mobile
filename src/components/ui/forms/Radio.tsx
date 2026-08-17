import {Circle, Svg} from 'react-native-svg'
import type {ReactNode} from 'react'
import type {GestureResponderEvent} from 'react-native'
import {
  PressableBase,
  PressableBaseProps,
} from '@/components/ui/buttons/PressableBase'
import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Phrase} from '@/components/ui/text/Phrase'
import {useTheme} from '@/themes/useTheme'

const RADIO_SIZE = 24

export type RadioProps = {
  disabledStyle?: 'default' | 'hidden' | 'none'
  isSelected: boolean
  label: ReactNode
  onPress: (event: GestureResponderEvent) => void
} & PressableBaseProps

type RadioIndicatorProps = {
  checked: boolean
} & Pick<RadioProps, 'disabled'>

const RadioIndicator = ({checked, disabled = false}: RadioIndicatorProps) => {
  const {color} = useTheme()

  return (
    <Svg
      height={RADIO_SIZE}
      viewBox="0 0 24 24"
      width={RADIO_SIZE}>
      <Circle
        cx={12}
        cy={12}
        fill={
          disabled
            ? color.control.disabled.background
            : color.control.default.background
        }
        r={11}
        stroke={
          disabled
            ? color.control.disabled.border
            : color.control.checked.border
        }
        strokeWidth={2}
      />
      {!!checked && (
        <Circle
          cx={12}
          cy={12}
          fill={
            disabled
              ? color.control.disabled.border
              : color.control.checked.border
          }
          r={8}
        />
      )}
    </Svg>
  )
}

export const Radio = ({
  label,
  isSelected,
  onPress,
  testID,
  disabled = false,
  disabledStyle = 'default',
  ...pressableProps
}: RadioProps) => (
  <PressableBase
    {...pressableProps}
    accessibilityLanguage="nl-NL"
    accessibilityRole="radio"
    accessibilityState={{selected: isSelected}}
    disabled={disabled}
    onPress={onPress}
    testID={testID}>
    <Row gutter="sm">
      {!!disabled && disabledStyle === 'none' ? null : !!disabled &&
        disabledStyle === 'hidden' ? (
        <Size width={RADIO_SIZE} />
      ) : (
        <RadioIndicator
          checked={isSelected}
          disabled={disabled}
        />
      )}
      {typeof label === 'string' ? (
        <Phrase
          accessible={false}
          color={disabled ? 'secondary' : 'default'}
          testID={`${testID}Phrase`}>
          {label}
        </Phrase>
      ) : (
        label
      )}
    </Row>
  </PressableBase>
)
