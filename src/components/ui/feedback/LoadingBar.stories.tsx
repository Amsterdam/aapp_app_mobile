import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {LoadingBar} from './LoadingBar'

const meta = {
  component: LoadingBar,
} satisfies Meta<typeof LoadingBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
