import {StyleSheet, View, type GestureResponderEvent} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import type {PressableBaseProps} from '@/components/ui/buttons/PressableBase'
import {FormField} from '@/components/ui/forms/FormField'
import {MainAxisPosition} from '@/components/ui/layout/types'
import {Icon} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = {
  isSelected: boolean
  label: string
  labelPosition?: MainAxisPosition
  onPress: (event: GestureResponderEvent) => void
} & PressableBaseProps

export const Checkbox = ({
  label,
  labelPosition = 'end',
  isSelected,
  onPress,
  testID,
  ...pressableProps
}: Props) => {
  const styles = useThemable(createStyles)

  return (
    <Pressable
      {...pressableProps}
      accessibilityLanguage="nl-NL"
      accessibilityRole="checkbox"
      accessibilityState={{selected: isSelected}}
      onPress={onPress}
      testID={testID}>
      <FormField
        label={<Phrase>{label}</Phrase>}
        labelPosition={labelPosition}>
        <View style={[styles.checkbox, isSelected && styles.checked]}>
          {!!isSelected && (
            <Icon
              color="inverse"
              name="check-mark"
              testID={`${testID}Icon`}
            />
          )}
        </View>
      </FormField>
    </Pressable>
  )
}

const createStyles = ({color}: Theme) =>
  StyleSheet.create({
    checkbox: {
      width: 24,
      aspectRatio: 1,
      padding: 2,
      borderWidth: 2,
      borderColor: color.control.checked.background,
      backgroundColor: color.control.default.background,
    },
    checked: {
      backgroundColor: color.control.checked.background,
    },
  })
