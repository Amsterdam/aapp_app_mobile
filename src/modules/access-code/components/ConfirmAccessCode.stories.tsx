import {ConfirmAccessCode} from './ConfirmAccessCode'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: ConfirmAccessCode,
  parameters: {
    accessCode: {
      codeLength: 5,
      codeConfirmed: [1, 1, 1, 1, 2],
    },
  },
} satisfies Meta<typeof ConfirmAccessCode>

type Story = StoryObj<typeof ConfirmAccessCode>

export const Default: Story = {}
export const ErrorState: Story = {
  parameters: {
    accessCode: {
      error: 'Toegangscode is onjuist.',
    },
  },
}
