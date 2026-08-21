import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ConstructionWorkFigure} from '@/components/ui/media/errors/ConstructionWorkFigure'

const meta = {
  component: ConstructionWorkFigure,
} satisfies Meta<typeof ConstructionWorkFigure>

export default meta

type Story = StoryObj<typeof ConstructionWorkFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
