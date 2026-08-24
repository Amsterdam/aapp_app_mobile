import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ReportProblemFigure} from '@/components/ui/media/errors/ReportProblemFigure'

const meta = {
  component: ReportProblemFigure,
} satisfies Meta<typeof ReportProblemFigure>

export default meta

type Story = StoryObj<typeof ReportProblemFigure>

export const Default: Story = {
  args: {
    height: 225,
    width: 264,
  },
}
