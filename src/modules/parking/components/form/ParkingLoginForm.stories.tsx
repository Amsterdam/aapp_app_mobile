import {ParkingLoginForm} from './ParkingLoginForm'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ParkingLoginForm,
} satisfies Meta<typeof ParkingLoginForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
