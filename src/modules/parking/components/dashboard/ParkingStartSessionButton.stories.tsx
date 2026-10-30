import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingStartSessionButton} from './ParkingStartSessionButton'

const meta = {
  component: ParkingStartSessionButton,
} satisfies Meta<typeof ParkingStartSessionButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
