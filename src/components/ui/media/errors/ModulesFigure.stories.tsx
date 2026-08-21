import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ModulesFigure} from '@/components/ui/media/errors/ModulesFigure'

const meta = {
  component: ModulesFigure,
} satisfies Meta<typeof ModulesFigure>

export default meta

type Story = StoryObj<typeof ModulesFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
