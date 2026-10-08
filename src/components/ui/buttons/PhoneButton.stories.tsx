import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {PhoneButton} from './PhoneButton'

export default {
  component: PhoneButton,
  argTypes: {},
} satisfies Meta<typeof PhoneButton>

export const Default: StoryObj<typeof PhoneButton> = {
  args: {
    phoneNumber: '0610000000',
  },
}
