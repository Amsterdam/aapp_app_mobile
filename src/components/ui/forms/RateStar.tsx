import type {PressableProps} from '@/components/ui/buttons/Pressable'
import type {GestureResponderEvent} from 'react-native'
import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'

type RateStarProps = {
  isSelected: boolean
  onPress: (event: GestureResponderEvent) => void
} & Omit<PressableProps, 'children' | 'onPress'>

export const RateStar = ({
  isSelected,
  testID,
  onPress,
  ...props
}: RateStarProps) => (
  <IconButton
    accessibilityHint="Selecteer deze score"
    accessibilityLanguage="nl-NL"
    accessibilityRole="radio"
    accessibilityState={{selected: isSelected}}
    {...props}
    icon={
      <Icon
        color="link"
        name={isSelected ? 'star_filled' : 'star'}
        size="xll"
        testID={`${testID}Icon`}
      />
    }
    onPress={onPress}
    testID={`${testID}IconButton`}
  />
)
