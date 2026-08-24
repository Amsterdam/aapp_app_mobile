import {LiveblogTag} from './LiveblogTag'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: LiveblogTag,
} satisfies Meta<typeof LiveblogTag>

export default meta

type Story = StoryObj<typeof LiveblogTag>

export const Default: Story = {}
