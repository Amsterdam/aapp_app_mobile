import {ListItemMarker} from './ListItemMarker'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ListItemMarker,
} satisfies Meta<typeof ListItemMarker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    marker: 'square',
    testID: 'ListItemMarker',
  },
}

export const CheckMark: Story = {
  args: {
    marker: 'check-mark',
    testID: 'ListItemMarker',
  },
}
