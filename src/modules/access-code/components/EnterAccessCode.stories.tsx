import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {EnterAccessCode} from './EnterAccessCode'

export default {
  component: EnterAccessCode,
  parameters: {
    accessCode: {
      codeLength: 5,
      codeEntered: [1, 1, 1, 1, 2],
    },
  },
  render: () => <EnterAccessCode key="EnterAccessCode" />,
} satisfies Meta<typeof EnterAccessCode>

type Story = StoryObj<typeof EnterAccessCode>

export const Default: Story = {}
export const ErrorState: Story = {
  parameters: {
    accessCode: {
      error: 'Toegangscode is onjuist.',
    },
  },
}
