import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ParkingIntroFigure} from './ParkingIntroFigure'

const meta = {
  component: ParkingIntroFigure,
} satisfies Meta<typeof ParkingIntroFigure>

export default meta

type Story = StoryObj<typeof ParkingIntroFigure>

export const Default: Story = {
  args: {
    height: 240,
    width: 375,
  },
}
