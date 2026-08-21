import {Fader} from './Fader'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Block} from '@/storybook/components/Block'

const meta = {
  component: Fader,
  args: {
    children: <Block label="Darth Fader" />,
  },
} satisfies Meta<typeof Fader>

export default meta

type Story = StoryObj<typeof Fader>

export const Default: Story = {}
