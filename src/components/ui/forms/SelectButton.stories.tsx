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
