import {ChargingPointStatus} from '../types'
import {BoatChargingSocketStatusTag} from './BoatChargingSocketStatusTag'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Column} from '@/components/ui/layout/Column'

const meta = {
  component: BoatChargingSocketStatusTag,
  render: args => (
    <Column halign="start">
      <BoatChargingSocketStatusTag {...args} />
    </Column>
  ),
} satisfies Meta<typeof BoatChargingSocketStatusTag>

export default meta

type Story = StoryObj<typeof BoatChargingSocketStatusTag>

export const Default: Story = {
  args: {
    status: ChargingPointStatus.OPERATIVE,
  },
}
