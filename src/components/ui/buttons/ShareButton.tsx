import {Platform} from 'react-native'
import type {TestProps} from '@/components/ui/types'
import {Button} from '@/components/ui/buttons/Button'

type Props = {
  accessibilityLabel?: string
  /**
   * @default "Delen"
   */
  label?: string
  onPress?: () => void
} & TestProps

export const ShareButton = ({
  testID,
  onPress,
  accessibilityLabel = 'Delen',
  label = 'Delen',
}: Props) => (
  <Button
    accessibilityLabel={accessibilityLabel}
    alignSelf="flex-start"
    icon={{
      name: Platform.OS === 'ios' ? 'share-ios' : 'share-android',
      size: 'ml',
    }}
    label={label}
    noPadding
    onPress={onPress}
    testID={testID}
    variant="tertiary"
  />
)
