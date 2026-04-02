import {StyleSheet, View} from 'react-native'
import {ElectionsCrowdUnknownPin} from './ElectionsCrowdUnknownPin'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

const meta: Meta<typeof ElectionsCrowdUnknownPin> = {
  component: ElectionsCrowdUnknownPin,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
}

export default meta

type Story = StoryObj<typeof ElectionsCrowdUnknownPin>

export const Default: Story = {
  args: {
    height: 39,
    width: 38,
  },
  render: args => (
    <View style={styles.wrapper}>
      <ElectionsCrowdUnknownPin {...args} />
    </View>
  ),
}
