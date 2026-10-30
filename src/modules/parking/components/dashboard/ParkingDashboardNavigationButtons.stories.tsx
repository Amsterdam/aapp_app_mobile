import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingDashboardNavigationButtons} from './ParkingDashboardNavigationButtons'

const meta = {
  component: ParkingDashboardNavigationButtons,
} satisfies Meta<typeof ParkingDashboardNavigationButtons>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
