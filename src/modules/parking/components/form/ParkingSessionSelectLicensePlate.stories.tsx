import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingLicensePlateFormProvider} from './ParkingLicensePlateFormProvider'
import {ParkingSessionSelectLicensePlate} from './ParkingSessionSelectLicensePlate'

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
  render: args => (
    <ParkingLicensePlateFormProvider defaultValues={{vehicle_id: 'ABC123'}}>
      <ParkingSessionSelectLicensePlate {...args} />
    </ParkingLicensePlateFormProvider>
  ),
} satisfies Meta<typeof ParkingSessionSelectLicensePlate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    setLicensePlate: () => null,
  },
}
