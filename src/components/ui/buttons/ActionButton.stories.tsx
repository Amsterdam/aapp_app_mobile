import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ActionButton} from './ActionButton'

export default {
  component: ActionButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} satisfies Meta<typeof ActionButton>

export const Default: StoryObj<typeof ActionButton> = {
  args: {
    label: 'Afvalpas',
    icon: {name: 'afvalpas'},
  },
}
