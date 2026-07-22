import {LoadingBar} from './LoadingBar'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: LoadingBar,
} satisfies Meta<typeof LoadingBar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
