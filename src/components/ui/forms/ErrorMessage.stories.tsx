import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ErrorMessage} from './ErrorMessage'

const meta = {
  component: ErrorMessage,
} satisfies Meta<typeof ErrorMessage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    testID: 'testIDMessage',
    text: 'Vul een waarde in',
  },
}

export const Small: Story = {
  args: {
    testID: 'testIDMessage',
    text: 'Vul een waarde in',
    variant: 'small',
  },
}

export const Multiline: Story = {
  args: {
    testID: 'testIDMessage',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
}
