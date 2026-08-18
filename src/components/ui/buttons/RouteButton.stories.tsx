import {RouteButton} from './RouteButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: RouteButton,
} satisfies Meta<typeof RouteButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    coordinates: {
      lat: 52.3678,
      lon: 4.9002,
    },
    testID: 'Button',
  },
}
