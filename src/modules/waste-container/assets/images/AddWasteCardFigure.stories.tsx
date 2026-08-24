import {AddWasteCardFigure} from './AddWasteCardFigure'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: AddWasteCardFigure,
} satisfies Meta<typeof AddWasteCardFigure>

export default meta

type Story = StoryObj<typeof AddWasteCardFigure>

export const Default: Story = {
  args: {
    height: 240,
    width: 375,
  },
}
