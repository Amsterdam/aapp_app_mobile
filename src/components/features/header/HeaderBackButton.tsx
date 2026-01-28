import {IconButton} from '@/components/ui/buttons/IconButton'
import {Icon} from '@/components/ui/media/Icon'
import {IconSize} from '@/components/ui/types'

type Props = {
  iconSize?: keyof typeof IconSize
  onPress: () => void
}

export const HeaderBackButton = ({iconSize = 'lg', onPress}: Props) => (
  <IconButton
    accessibilityLabel="Terug"
    hitSlop={16}
    icon={
      <Icon
        color="link"
        name="chevron-left"
        size={iconSize}
        testID="HeaderBackIcon"
      />
    }
    onPress={onPress}
    testID="HeaderBackButton"
  />
)
