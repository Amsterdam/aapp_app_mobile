import {StyleSheet, View} from 'react-native'
import {DistinctPin} from './DistinctPin'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

const meta: Meta<typeof DistinctPin> = {
  component: DistinctPin,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
}

export default meta

type Story = StoryObj<typeof DistinctPin>

export const Default: Story = {
  args: {
    height: 39,
    width: 38,
  },
  render: args => (
    <View style={styles.wrapper}>
      <DistinctPin {...args} />
    </View>
  ),
}
