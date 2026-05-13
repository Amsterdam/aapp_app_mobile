import {AddWasteCardFigure} from './AddWasteCardFigure'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta: Meta<typeof AddWasteCardFigure> = {
  component: AddWasteCardFigure,
}

export default meta

type Story = StoryObj<typeof AddWasteCardFigure>

export const Default: Story = {
  args: {
    height: 240,
    width: 375,
  },
}
