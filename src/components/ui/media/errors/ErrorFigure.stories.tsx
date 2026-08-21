import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ErrorFigure} from '@/components/ui/media/errors/ErrorFigure'

const meta = {
  component: ErrorFigure,
} satisfies Meta<typeof ErrorFigure>

export default meta

type Story = StoryObj<typeof ErrorFigure>

export const Default: Story = {}
