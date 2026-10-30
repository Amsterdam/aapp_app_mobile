import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingPermitBalanceTime} from './ParkingPermitBalanceTime'

const meta = {
  component: ParkingPermitBalanceTime,
} satisfies Meta<typeof ParkingPermitBalanceTime>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
