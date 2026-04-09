import {StyleSheet, View} from 'react-native'
import {MapMarkerPin} from './Pin'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

const meta: Meta<typeof MapMarkerPin> = {
  component: MapMarkerPin,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
}

export default meta

type Story = StoryObj<typeof MapMarkerPin>

export const Default: Story = {
  args: {
    height: 40,
    width: 40,
  },
  render: args => (
    <View style={styles.wrapper}>
      <MapMarkerPin {...args} />
    </View>
  ),
}
