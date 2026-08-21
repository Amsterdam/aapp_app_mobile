import {WasteCardBluetoothSvg} from './WasteCardBluetoothSvg'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: WasteCardBluetoothSvg,
} satisfies Meta<typeof WasteCardBluetoothSvg>

export default meta

type Story = StoryObj<typeof WasteCardBluetoothSvg>

export const Default: Story = {
  args: {
    height: 86,
    width: 68,
  },
}
