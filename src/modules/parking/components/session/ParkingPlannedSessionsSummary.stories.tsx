import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingPlannedSessionsSummary} from './ParkingPlannedSessionsSummary'

const meta = {
  component: ParkingPlannedSessionsSummary,
} satisfies Meta<typeof ParkingPlannedSessionsSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
