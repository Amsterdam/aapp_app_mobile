import {ShareButton} from './ShareButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ShareButton,
} satisfies Meta<typeof ShareButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    testID: 'Button',
  },
}
