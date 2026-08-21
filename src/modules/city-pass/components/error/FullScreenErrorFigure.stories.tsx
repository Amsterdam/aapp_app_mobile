import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {FullScreenErrorFigure} from '@/modules/city-pass/components/error/FullScreenErrorFigure'

const meta = {
  component: FullScreenErrorFigure,
} satisfies Meta<typeof FullScreenErrorFigure>

export default meta

export const Default: StoryObj<typeof FullScreenErrorFigure> = {}
