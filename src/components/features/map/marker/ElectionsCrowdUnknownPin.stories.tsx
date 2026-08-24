import {StyleSheet, View} from 'react-native'
import {MapMarkerElectionsCrowdUnknownPin} from './ElectionsCrowdUnknownPin'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

const meta = {
  component: MapMarkerElectionsCrowdUnknownPin,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
} satisfies Meta<typeof MapMarkerElectionsCrowdUnknownPin>

export default meta

type Story = StoryObj<typeof MapMarkerElectionsCrowdUnknownPin>

export const Default: Story = {
  args: {
    height: 40,
    width: 40,
  },
  render: args => (
    <View style={styles.wrapper}>
      <MapMarkerElectionsCrowdUnknownPin {...args} />
    </View>
  ),
}
