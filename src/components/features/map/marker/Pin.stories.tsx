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

const meta = {
  component: MapMarkerPin,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
} satisfies Meta<typeof MapMarkerPin>

export default meta

type Story = StoryObj<typeof MapMarkerPin>

export const Default: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <MapMarkerPin />
    </View>
  ),
}
