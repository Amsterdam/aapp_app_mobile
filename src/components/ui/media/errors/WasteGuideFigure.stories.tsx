import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {WasteGuideFigure} from '@/components/ui/media/errors/WasteGuideFigure'

const meta = {
  component: WasteGuideFigure,
} satisfies Meta<typeof WasteGuideFigure>

export default meta

type Story = StoryObj<typeof WasteGuideFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
