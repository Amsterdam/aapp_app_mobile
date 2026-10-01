import {ParkingSessionFormProvider} from '../ParkingSessionFormProvider'
import {ParkingSessionStartTimeBottomSheetContent} from './ParkingSessionStartTimeBottomSheetContent'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ParkingSessionStartTimeBottomSheetContent,
  decorators: Story => (
    <ParkingSessionFormProvider>
      <Story />
    </ParkingSessionFormProvider>
  ),
  parameters: {
    bottomSheet: {
      isOpen: true,
    },
  },
} satisfies Meta<typeof ParkingSessionStartTimeBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
