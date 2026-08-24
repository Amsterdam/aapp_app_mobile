import {StyleSheet, View} from 'react-native'
import {MapMarkerSelectedPin} from './SelectedPin'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

const meta = {
  component: MapMarkerSelectedPin,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
} satisfies Meta<typeof MapMarkerSelectedPin>

export default meta

type Story = StoryObj<typeof MapMarkerSelectedPin>

export const Default: Story = {
  args: {
    height: 52,
    width: 52,
  },
  render: args => (
    <View style={styles.wrapper}>
      <MapMarkerSelectedPin {...args} />
    </View>
  ),
}
