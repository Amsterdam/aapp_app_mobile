import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingPaymentByVisitorButton} from './ParkingPaymentByVisitorButton'

const meta = {
  component: ParkingPaymentByVisitorButton,
} satisfies Meta<typeof ParkingPaymentByVisitorButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
