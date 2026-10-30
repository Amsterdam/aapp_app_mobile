import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {FC} from 'react'
import {ParkingLicensePlateFormProvider} from './ParkingLicensePlateFormProvider'
import {ParkingSessionAddLicensePlate} from './ParkingSessionAddLicensePlate'

const formDecorator = (Story: FC) => (
  <ParkingLicensePlateFormProvider>
    <Story />
  </ParkingLicensePlateFormProvider>
)

const meta = {
  argTypes: {},
  component: ParkingSessionAddLicensePlate,
  decorators: [formDecorator],
  parameters: {
    bottomSheet: {
      isOpen: true,
    },
  },
} satisfies Meta<typeof ParkingSessionAddLicensePlate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
