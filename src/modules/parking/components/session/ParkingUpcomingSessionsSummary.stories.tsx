import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingUpcomingSessionsSummary} from './ParkingUpcomingSessionsSummary'

const meta = {
  component: ParkingUpcomingSessionsSummary,
} satisfies Meta<typeof ParkingUpcomingSessionsSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
