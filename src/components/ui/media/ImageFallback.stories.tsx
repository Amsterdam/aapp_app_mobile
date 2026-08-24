import {ImageFallback} from './ImageFallback'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ImageFallback,
} satisfies Meta<typeof ImageFallback>

export default meta

export const Default: StoryObj<typeof ImageFallback> = {
  args: {
    aspectRatio: 'wide',
  },
}
