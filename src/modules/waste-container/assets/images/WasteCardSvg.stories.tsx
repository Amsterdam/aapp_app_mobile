import {WasteCardSvg} from './WasteCardSvg'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: WasteCardSvg,
} satisfies Meta<typeof WasteCardSvg>

export default meta

type Story = StoryObj<typeof WasteCardSvg>

export const Default: Story = {}
