import {StyleSheet, View} from 'react-native'
import {MapMarkerBase} from './MarkerBase'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#d7d7d7',
  },
})

const meta: Meta<typeof MapMarkerBase> = {
  component: MapMarkerBase,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
}

export default meta

type Story = StoryObj<typeof MapMarkerBase>

export const Default: Story = {
  args: {
    height: 40,
    width: 40,
  },
  render: args => (
    <View style={styles.wrapper}>
      <MapMarkerBase {...args} />
    </View>
  ),
}
