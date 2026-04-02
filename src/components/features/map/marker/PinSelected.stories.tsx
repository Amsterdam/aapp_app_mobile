import {StyleSheet, View} from 'react-native'
import {PinSelected} from './PinSelected'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

const meta: Meta<typeof PinSelected> = {
  component: PinSelected,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
}

export default meta

type Story = StoryObj<typeof PinSelected>

export const Default: Story = {
  args: {
    height: 52,
    width: 52,
  },
  render: args => (
    <View style={styles.wrapper}>
      <PinSelected {...args} />
    </View>
  ),
}
