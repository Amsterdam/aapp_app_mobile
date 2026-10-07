import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingActiveSessionsSummary} from './ParkingActiveSessionsSummary'

const meta = {
  component: ParkingActiveSessionsSummary,
} satisfies Meta<typeof ParkingActiveSessionsSummary>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
