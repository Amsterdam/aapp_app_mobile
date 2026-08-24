import {PressableBase} from './PressableBase'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import pressableArgTypes from '@/storybook/utils/pressable-arg-types'

const meta = {
  component: PressableBase,
  argTypes: pressableArgTypes,
} satisfies Meta<typeof PressableBase>

export default meta

type Story = StoryObj<typeof PressableBase>

export const Default: Story = {}
