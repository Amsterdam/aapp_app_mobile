import {OrderedListItemMarker} from './OrderedListItemMarker'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: OrderedListItemMarker,
} satisfies Meta<typeof OrderedListItemMarker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    number: 1,
    testID: 'OrderedListItemMarker',
  },
}
