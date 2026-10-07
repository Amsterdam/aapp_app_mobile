import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {EmptyMessage} from './EmptyMessage'

export default {
  component: EmptyMessage,
} satisfies Meta<typeof EmptyMessage>

export const Default: StoryObj<typeof EmptyMessage> = {
  args: {
    text: 'We hebben geen werkzaamheden gevonden voor dit adres.',
  },
}
