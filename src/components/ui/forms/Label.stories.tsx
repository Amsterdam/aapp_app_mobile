import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Label} from '@/components/ui/forms/Label'

export default {
  component: Label,
} satisfies Meta<typeof Label>

export const Default: StoryObj<typeof Label> = {
  args: {
    text: 'Wat is de titel van je bericht?',
  },
}
