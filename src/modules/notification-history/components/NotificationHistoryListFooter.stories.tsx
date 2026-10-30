import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {NotificationHistoryListFooter} from './NotificationHistoryListFooter'

const meta = {
  component: NotificationHistoryListFooter,
} satisfies Meta<typeof NotificationHistoryListFooter>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
