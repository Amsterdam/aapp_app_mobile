import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingLicensePlateFormProvider} from '../form/ParkingLicensePlateFormProvider'
import {VehicleInformation} from './VehicleInformation'

const meta = {
  component: VehicleInformation,
} satisfies Meta<typeof VehicleInformation>

export default meta

type Story = StoryObj<typeof meta>

/**
 * When a license plate is found in the RDW register
 */
export const Success: Story = {
  render: args => (
    <ParkingLicensePlateFormProvider defaultValues={{vehicle_id: '12AB34'}}>
      <VehicleInformation {...args} />
    </ParkingLicensePlateFormProvider>
  ),
}

/**
 * When a license plate cannot be found in the RDW register or the length is not valid for a Dutch license plate
 */
export const Warning: Story = {
  render: args => (
    <ParkingLicensePlateFormProvider defaultValues={{vehicle_id: '12AB346'}}>
      <VehicleInformation {...args} />
    </ParkingLicensePlateFormProvider>
  ),
}
