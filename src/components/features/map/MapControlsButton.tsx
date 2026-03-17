import {StyleSheet, View} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Icon, type IconProps} from '@/components/ui/media/Icon'
import {TestProps} from '@/components/ui/types'

type Props = {
  accessibilityLabel: string
  icon: IconProps
  onPress: () => void
} & TestProps

const EXTRA_PADDING = 2

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
      <View style={styles.extraPadding}>
        <Icon
          color="link"
          {...icon}
          size="lg"
        />
      </View>
    </Box>
  </Pressable>
)

const styles = StyleSheet.create({
  /**
   * Aligns the height of the map control button with the map filters
   */
  extraPadding: {padding: EXTRA_PADDING},
})
