import {Pressable} from './Pressable'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Paragraph} from '@/components/ui/text/Paragraph'

export default {
  component: Pressable,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} satisfies Meta<typeof Pressable>

export const Default: StoryObj<typeof Pressable> = {
  args: {
    children: <Paragraph>Press me</Paragraph>,
    insetHorizontal: 'lg',
  },
}
