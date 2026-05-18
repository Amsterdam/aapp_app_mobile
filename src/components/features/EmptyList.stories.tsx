import {EmptyList} from './EmptyList'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta: Meta<typeof EmptyList> = {
  component: EmptyList,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    testID: 'StorybookList',
    text: 'Geen resultaat',
  },
}
