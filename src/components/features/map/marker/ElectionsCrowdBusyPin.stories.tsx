import {StyleSheet, View} from 'react-native'
import {ElectionsCrowdBusyPin} from './ElectionsCrowdBusyPin'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

const meta: Meta<typeof ElectionsCrowdBusyPin> = {
  component: ElectionsCrowdBusyPin,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
}

export default meta

type Story = StoryObj<typeof ElectionsCrowdBusyPin>

export const Default: Story = {
  args: {
    height: 40,
    width: 40,
  },
  render: args => (
    <View style={styles.wrapper}>
      <ElectionsCrowdBusyPin {...args} />
    </View>
  ),
}
