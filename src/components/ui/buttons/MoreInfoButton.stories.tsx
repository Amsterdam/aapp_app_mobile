import {MoreInfoButton} from './MoreInfoButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: MoreInfoButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} as Meta<typeof MoreInfoButton>

export const Default: StoryObj<typeof MoreInfoButton> = {
  args: {
    text: 'Meer informatie',
  },
}
