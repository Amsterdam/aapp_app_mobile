import {CustomMarkerIcon} from './CustomMarkerIcon'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {boatChargingPointStateMap} from '@/modules/boat-charging/constants/boatChargingPointStateMap'
import {BoatChargingPointState} from '@/modules/boat-charging/types'
import {themes} from '@/themes/themes'

const meta: Meta<typeof CustomMarkerIcon> = {
  component: CustomMarkerIcon,
  parameters: {
    backgrounds: {
      default: 'custom-grey0',
    },
  },
}

export default meta

type Story = StoryObj<typeof CustomMarkerIcon>

export const Default: Story = {
  render: args => (
    <Column gutter="md">
      <Row gutter="md">
        {Object.values(themes.light.size.spacing).map(size => (
          <CustomMarkerIcon
            {...args}
            icon={boatChargingPointStateMap[BoatChargingPointState.free].icon}
            size={size}
          />
        ))}
      </Row>
      <Row gutter="md">
        {Object.values(themes.light.size.spacing).map(size => (
          <CustomMarkerIcon
            {...args}
            icon={
              boatChargingPointStateMap[BoatChargingPointState.occupied].icon
            }
            size={size}
          />
        ))}
      </Row>

      <Row gutter="md">
        {Object.values(themes.light.size.spacing).map(size => (
          <CustomMarkerIcon
            {...args}
            icon={
              boatChargingPointStateMap[BoatChargingPointState.malfunction].icon
            }
            size={size}
          />
        ))}
      </Row>
    </Column>
  ),
}
