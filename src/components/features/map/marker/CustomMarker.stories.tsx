import {StyleSheet, View} from 'react-native'
import {CustomMarker} from './CustomMarker'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Row} from '@/components/ui/layout/Row'
import {SvgIconsConfig} from '@/components/ui/media/svgIcons'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {BoatChargingPointState} from '@/modules/boat-charging/types'

const meta = {
  component: CustomMarker,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
} satisfies Meta<typeof CustomMarker>

export default meta

type Story = StoryObj<typeof CustomMarker>

export const Default: Story = {
  render: args => (
    <View style={styles.container}>
      <Row gutter="md">
        <CustomMarker
          {...args}
          icon={boatChargingPointStateMap[BoatChargingPointState.free].icon}
        />
        <CustomMarker
          {...args}
          icon={boatChargingPointStateMap[BoatChargingPointState.occupied].icon}
        />
        <CustomMarker
          {...args}
          icon={
            boatChargingPointStateMap[BoatChargingPointState.malfunction].icon
          }
        />
        <CustomMarker
          {...args}
          icon={{path: SvgIconsConfig['question-mark-circle'].default.path}}
        />
        <CustomMarker
          {...args}
          icon={{path: SvgIconsConfig.asterisk.default.path, pathColor: 'red'}}
        />
      </Row>
    </View>
  ),
}

export const WithCustomIcon: Story = {
  render: args => (
    <View style={styles.container}>
      <Row gutter="md">
        <CustomMarker {...args} />
      </Row>
    </View>
  ),
  args: {
    icon: {
      circleColor: 'blue',
      path: SvgIconsConfig.lightning.default.path,
      pathColor: 'white',
    },
  },
}
export const WithCustomIconWithColors: Story = {
  render: args => (
    <View style={styles.container}>
      <Row gutter="md">
        <CustomMarker {...args} />
      </Row>
    </View>
  ),
  args: {
    icon: {
      path: SvgIconsConfig.lightning.default.path,
      pathColor: 'white',
      colors: ['#ffff00', '#ff0000', '#0000ff', '#00ff00'],
    },
  },
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cdcdcd',
    padding: 24,
  },
})
