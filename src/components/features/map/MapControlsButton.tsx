import {StyleSheet, View} from 'react-native'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon, type IconProps} from '@/components/ui/media/Icon'
import {Phrase} from '@/components/ui/text/Phrase'
import {TestProps} from '@/components/ui/types'

type Props = {
  accessibilityLabel: string
  icon: IconProps
  onPress: () => void
  text?: string
} & TestProps

export const MapControlsButton = ({
  accessibilityLabel,
  icon,
  text,
  onPress,
  testID,
}: Props) => (
  <View style={styles.container}>
    <Pressable
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      testID={testID}>
      <Box
        borderColor="distinct"
        borderWidth="md"
        inset="sm">
        <Row gutter="sm">
          <Icon
            color="link"
            {...icon}
            size="lg"
          />
          {!!text && <Phrase color="link">{text}</Phrase>}
        </Row>
      </Box>
    </Pressable>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
  },
})
