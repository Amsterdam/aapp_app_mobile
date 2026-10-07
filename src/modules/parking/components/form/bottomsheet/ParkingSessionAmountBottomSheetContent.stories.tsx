import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingSessionFormProvider} from '../ParkingSessionFormProvider'
import {ParkingSessionAmountBottomSheetContent} from './ParkingSessionAmountBottomSheetContent'

const meta = {
  component: ParkingSessionAmountBottomSheetContent,
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
} satisfies Meta<typeof ParkingSessionAmountBottomSheetContent>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
