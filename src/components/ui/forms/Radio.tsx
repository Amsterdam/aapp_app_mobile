import {Circle, Svg} from 'react-native-svg'
import type {ReactNode} from 'react'
import type {GestureResponderEvent} from 'react-native'
import {
  PressableBase,
  PressableBaseProps,
} from '@/components/ui/buttons/PressableBase'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {useTheme} from '@/themes/useTheme'

type RadioProps = {
  isSelected: boolean
  label: ReactNode
  onPress: (event: GestureResponderEvent) => void
} & PressableBaseProps

type RadioIndicatorProps = {
  checked: boolean
}

const RadioIndicator = ({checked}: RadioIndicatorProps) => {
  const {color} = useTheme()

  return (
    <Svg
      height={24}
      viewBox="0 0 24 24"
      width={24}>
      <Circle
        cx={12}
        cy={12}
        fill={color.control.default.background}
        r={11}
        stroke={color.control.checked.border}
        strokeWidth={2}
      />
      {!!checked && (
        <Circle
          cx={12}
          cy={12}
          fill={color.control.checked.border}
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
  ...pressableProps
}: RadioProps) => (
  <PressableBase
    {...pressableProps}
    accessibilityLanguage="nl-NL"
    accessibilityRole="radio"
    accessibilityState={{selected: isSelected}}
    onPress={onPress}
    testID={testID}>
    <Row gutter="sm">
      <RadioIndicator checked={isSelected} />
      {typeof label === 'string' ? (
        <Phrase testID={`${testID}Phrase`}>{label}</Phrase>
      ) : (
        label
      )}
    </Row>
  </PressableBase>
)
