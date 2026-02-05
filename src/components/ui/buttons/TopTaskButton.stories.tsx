import {TopTaskButton} from './TopTaskButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: TopTaskButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof TopTaskButton>

export const Default: StoryObj<typeof TopTaskButton> = {
  args: {
    icon: {name: 'mail'},
    text: 'Reactie binnen 1 werkdag',
    title: 'Contactformulier',
  },
}
