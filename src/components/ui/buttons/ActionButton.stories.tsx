import {ActionButton} from './ActionButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: ActionButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof ActionButton>

export const Default: StoryObj<typeof ActionButton> = {
  args: {
    label: 'Afvalpas',
    iconName: 'afvalpas',
  },
}
