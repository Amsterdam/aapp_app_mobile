import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ConstructionWorkDetailFigure} from '@/components/ui/media/errors/ConstructionWorkDetailFigure'

const meta = {
  component: ConstructionWorkDetailFigure,
} satisfies Meta<typeof ConstructionWorkDetailFigure>

export default meta

type Story = StoryObj<typeof ConstructionWorkDetailFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
