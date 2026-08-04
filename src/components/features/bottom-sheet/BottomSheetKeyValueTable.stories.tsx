import {BottomSheetKeyValueTable} from './BottomSheetKeyValueTable'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: BottomSheetKeyValueTable,
} satisfies Meta<typeof BottomSheetKeyValueTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rows: [
      {
        key: 'Key 1',
        value: 'Value 1',
      },
      {
        key: 'Key 2',
        value: 'Value 2',
      },
    ],
    title: 'Key Value Table',
  },
}
export const WithoutTitle: Story = {
  args: {
    rows: [
      {
        key: 'Key 1',
        value: 'Value 1',
      },
      {
        key: 'Key 2',
        value: 'Value 2',
      },
    ],
    title: undefined,
  },
}

export const WithDividers: Story = {
  args: {
    rows: [
      {
        key: 'Key 1',
        value: 'Value 1',
      },
      {
        key: 'Key 2',
        value: 'Value 2',
      },
    ],
    title: 'Key Value Table',
    showDividers: true,
  },
}
