import {StyleSheet, View} from 'react-native'
import {ElectionsCrowdMediumPin} from './ElectionsCrowdMediumPin'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

const meta: Meta<typeof ElectionsCrowdMediumPin> = {
  component: ElectionsCrowdMediumPin,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
}

export default meta

type Story = StoryObj<typeof ElectionsCrowdMediumPin>

export const Default: Story = {
  args: {
    height: 40,
    width: 40,
  },
  render: args => (
    <View style={styles.wrapper}>
      <ElectionsCrowdMediumPin {...args} />
    </View>
  ),
}
