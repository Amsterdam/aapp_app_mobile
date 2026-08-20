import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {TextInput} from '@/components/ui/forms/input/TextInput'

export default {
  component: TextInput,
} satisfies Meta<typeof TextInput>

export const Default: StoryObj<typeof TextInput> = {
  args: {
    label: 'Wat is de titel van je bericht?',
    placeholder: 'Voer een titel in...',
    value: '',
  },
}

export const Multiline: StoryObj<typeof TextInput> = {
  args: {
    label: 'Wat is de titel van je bericht?',
    multiline: true,
    numberOfLines: 5,
    placeholder: 'Voer een titel in...',
    value: '',
  },
}
