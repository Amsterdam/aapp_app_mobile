import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingLoginForm} from './ParkingLoginForm'

const meta = {
  component: ParkingLoginForm,
} satisfies Meta<typeof ParkingLoginForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
