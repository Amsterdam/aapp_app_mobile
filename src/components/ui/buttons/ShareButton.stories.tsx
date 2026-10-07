import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {ShareButton} from './ShareButton'

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
