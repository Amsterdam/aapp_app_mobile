import {SetAccessCode} from './SetAccessCode'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: SetAccessCode,
  parameters: {
    accessCode: {
      codeLength: 5,
      codeSet: [1, 1, 1, 1, 2],
      error: undefined,
    },
  },
  render: () => <SetAccessCode key="SetAccessCode" />,
} satisfies Meta<typeof SetAccessCode>

type Story = StoryObj<typeof SetAccessCode>

export const Default: Story = {}
export const ErrorState: Story = {
  parameters: {
    accessCode: {
      error: 'Toegangscode is onjuist.',
    },
  },
}
