import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {UpdateFigure} from '@/components/ui/media/errors/UpdateFigure'

const meta = {
  component: UpdateFigure,
} satisfies Meta<typeof UpdateFigure>

export default meta

type Story = StoryObj<typeof UpdateFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
