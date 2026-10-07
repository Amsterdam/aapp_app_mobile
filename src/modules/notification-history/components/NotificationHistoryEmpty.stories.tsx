import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {NotificationHistoryEmpty} from './NotificationHistoryEmpty'

const meta = {
  component: NotificationHistoryEmpty,
} satisfies Meta<typeof NotificationHistoryEmpty>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
