import {EmptyMessage} from './EmptyMessage'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: EmptyMessage,
} satisfies Meta<typeof EmptyMessage>

export const Default: StoryObj<typeof EmptyMessage> = {
  args: {
    text: 'We hebben geen werkzaamheden gevonden voor dit adres.',
  },
}
