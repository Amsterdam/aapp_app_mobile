import {BottomSheetLabelValueRow} from './BottomSheetLabelValueRow'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: BottomSheetLabelValueRow,
} satisfies Meta<typeof BottomSheetLabelValueRow>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Prijs',
    value: '€ 7,67',
  },
}
