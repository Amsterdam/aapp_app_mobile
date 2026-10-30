import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {MenuHeaderButton} from './MenuHeaderButton'

const meta = {
  component: MenuHeaderButton,
} satisfies Meta<typeof MenuHeaderButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    testID: 'MenuHeaderButton',
  },
}
