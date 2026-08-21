import {FollowButton} from './FollowButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: FollowButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} satisfies Meta<typeof FollowButton>

export const Default: StoryObj<typeof FollowButton> = {
  args: {
    followed: false,
  },
}
