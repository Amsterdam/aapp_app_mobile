import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Icon, type IconProps} from '@/components/ui/media/Icon'
import {TestProps} from '@/components/ui/types'

type Props = {
  accessibilityLabel: string
  icon: IconProps
  onPress: () => void
} & TestProps

export const MapControlsButton = ({
  accessibilityLabel,
  icon,
  onPress,
  testID,
}: Props) => (
  <Pressable
    accessibilityLabel={accessibilityLabel}
    onPress={onPress}
    testID={testID}>
    <Box
      borderColor="distinct"
      borderWidth="md"
      inset="sm">
      <Icon
        color="link"
        {...icon}
        size="lg"
      />
    </Box>
  </Pressable>
)
