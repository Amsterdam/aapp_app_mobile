import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {SelectButton} from './SelectButton'

const meta = {
  component: SelectButton,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} satisfies Meta<typeof SelectButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: {name: 'warning'},
    testID: 'testIdAlert',
    text: 'Text',
    title: 'Title',
    onPress: () => null,
  },
}

export const ErrorState: Story = {
  parameters: {
    controls: {
      exclude: ['error'],
    },
  },
  args: {
    icon: {name: 'warning'},
    testID: 'testIdErrorStateButton',
    text: 'Text',
    title: 'Title',
    error: {
      message: 'Kies een andere optie',
      type: 'validate',
    },
    onPress: () => null,
  },
}
