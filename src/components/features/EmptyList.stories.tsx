import {Size} from '../ui/layout/Size'
import {EmptyList} from './EmptyList'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta: Meta<typeof EmptyList> = {
  component: EmptyList,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    testID: 'StorybookEmptyList',
    text: 'Geen resultaten',
  },
  render: props => (
    <Size height={500}>
      <EmptyList {...props} />
    </Size>
  ),
}
