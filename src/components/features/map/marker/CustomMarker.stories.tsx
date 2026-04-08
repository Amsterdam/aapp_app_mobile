import {StyleSheet, View} from 'react-native'
import {CustomMarker} from './CustomMarker'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#d7d7d7',
  },
})

const meta: Meta<typeof CustomMarker> = {
  component: CustomMarker,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
  args: {
    icon: {
      circle_color: '#009DE6',
      path_color: '#ffffff',
      path: 'M10.8333 6.16667H13.1667V17.8333H10.8333V6.16667Z',
    },
    scale: 1,
  },
}

export default meta

type Story = StoryObj<typeof CustomMarker>

export const Default: Story = {
  args: {
    width: 60,
    height: 60,
  },
  render: args => (
    <View style={styles.wrapper}>
      <CustomMarker {...args} />
    </View>
  ),
}
