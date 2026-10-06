import {AccessCode} from './AccessCode'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: AccessCode,
  args: {
    accessCode: [],
    codeLength: 5,
  },
  argTypes: {
    accessCode: {
      control: 'text',
    },
  },
} satisfies Meta<typeof AccessCode>

type Story = StoryObj<typeof AccessCode>

export const Default: Story = {}

export const Filled: Story = {
  render: args => (
    <AccessCode
      {...args}
      accessCode={
        Array.from({length: args.codeLength}).fill(1) as Array<number>
      }
    />
  ),
  parameters: {
    controls: {
      exclude: ['accessCode'],
    },
  },
}

export const ErrorState: Story = {
  args: {
    error: 'Toegangscode onjuist. Nog 4 pogingen over.',
    codeLength: 5,
    isCodeEntered: true,
  },
  parameters: {
    controls: {
      exclude: ['error', 'accessCode'],
    },
  },
}
