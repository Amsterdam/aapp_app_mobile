import {PhoneButton} from './PhoneButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: PhoneButton,
  argTypes: {},
} satisfies Meta<typeof PhoneButton>

export const Default: StoryObj<typeof PhoneButton> = {
  args: {
    phoneNumber: '0610000000',
  },
}
