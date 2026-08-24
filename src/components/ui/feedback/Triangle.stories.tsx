import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Triangle} from '@/components/ui/feedback/Triangle'
import {Direction} from '@/components/ui/types'

export default {
  component: Triangle,
} satisfies Meta<typeof Triangle>

export const Default: StoryObj<typeof Triangle> = {
  args: {
    direction: Direction.right,
  },
}
