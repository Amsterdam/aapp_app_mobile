import type {GestureResponderEvent} from 'react-native'
import {Button} from '@/components/ui/buttons/Button'
import type {PressableBaseProps} from '@/components/ui/buttons/PressableBase'

type Props = {
  isSelected: boolean
  label: string
  onPress: (event: GestureResponderEvent) => void
} & PressableBaseProps

export const SelectionButton = ({
  label,
  isSelected,
  onPress,
  ...buttonProps
}: Props) => (
  <Button
    {...buttonProps}
    accessibilityHint={`Selecteer de optie: ${label}`}
    accessibilityState={{selected: isSelected}}
    label={label}
    onPress={onPress}
    variant={isSelected ? 'primary' : 'secondary'}
  />
)
