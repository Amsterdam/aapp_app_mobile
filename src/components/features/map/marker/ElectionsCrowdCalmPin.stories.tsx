import {StyleSheet, View} from 'react-native'
import {ElectionsCrowdCalmPin} from './ElectionsCrowdCalmPin'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

const meta: Meta<typeof ElectionsCrowdCalmPin> = {
  component: ElectionsCrowdCalmPin,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
}

export default meta

type Story = StoryObj<typeof ElectionsCrowdCalmPin>

export const Default: Story = {
  args: {
    height: 40,
    width: 40,
  },
  render: args => (
    <View style={styles.wrapper}>
      <ElectionsCrowdCalmPin {...args} />
    </View>
  ),
}
