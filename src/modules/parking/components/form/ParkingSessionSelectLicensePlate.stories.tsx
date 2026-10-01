import {ParkingSessionSelectLicensePlate} from './ParkingSessionSelectLicensePlate'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ParkingSessionSelectLicensePlate,
  argTypes: {
    setLicensePlate: {
      action: 'setLicensePlate',
    },
  },
  parameters: {
    bottomSheet: {
      isOpen: true,
    },
  },
} satisfies Meta<typeof ParkingSessionSelectLicensePlate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    setLicensePlate: () => null,
  },
}
