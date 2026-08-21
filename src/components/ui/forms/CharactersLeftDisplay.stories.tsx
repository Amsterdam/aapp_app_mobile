import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {CharactersLeftDisplay} from '@/components/ui/forms/CharactersLeftDisplay'

export default {
  component: CharactersLeftDisplay,
} satisfies Meta<typeof CharactersLeftDisplay>

export const Default: StoryObj<typeof CharactersLeftDisplay> = {
  args: {
    maxCharacters: 50,
    numOfCharacters: 0,
  },
}
