import {FC} from 'react'
import {ParkingSessionAddLicensePlate} from './ParkingSessionAddLicensePlate'
import {ParkingSessionLicensePlateFormProvider} from './ParkingSessionLicensePlateFormProvider'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const formDecorator = (Story: FC) => (
  <ParkingSessionLicensePlateFormProvider>
    <Story />
  </ParkingSessionLicensePlateFormProvider>
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
  tags: ['!autodocs'],
} satisfies Meta<typeof ParkingSessionAddLicensePlate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
