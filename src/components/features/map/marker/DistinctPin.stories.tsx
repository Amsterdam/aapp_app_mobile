import {StyleSheet, View} from 'react-native'
import {MapMarkerDistinctPin} from './DistinctPin'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
})

const meta = {
  component: MapMarkerDistinctPin,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
} satisfies Meta<typeof MapMarkerDistinctPin>

export default meta

type Story = StoryObj<typeof MapMarkerDistinctPin>

export const Default: Story = {
  render: () => (
    <View style={styles.wrapper}>
      <MapMarkerDistinctPin />
    </View>
  ),
}
