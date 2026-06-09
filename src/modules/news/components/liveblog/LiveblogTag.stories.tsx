import {LiveblogTag} from './LiveblogTag'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta: Meta<typeof LiveblogTag> = {
  component: LiveblogTag,
}

export default meta

type Story = StoryObj<typeof LiveblogTag>

export const Default: Story = {}
