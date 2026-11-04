import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingLicensePlateFormProvider} from './ParkingLicensePlateFormProvider'
import {ParkingVehicleIdTextInput} from './ParkingVehicleIdTextInput'

const meta = {
  component: ParkingVehicleIdTextInput,
  render: args => (
    <ParkingLicensePlateFormProvider defaultValues={{vehicle_id: '12AB34'}}>
      <ParkingVehicleIdTextInput {...args} />
    </ParkingLicensePlateFormProvider>
  ),
} satisfies Meta<typeof ParkingVehicleIdTextInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    inputInstructions: 'Voer alleen letters en cijfers in.',
    label: 'Kenteken',
    testID: 'ParkingLicensePlateFormLicensePlateInputField',
  },
}
