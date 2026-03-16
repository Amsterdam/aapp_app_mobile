import {FilterButton} from './FilterButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const FILTER = {
  filter_key: 'aapp_is_toilet',
  filter_value: true,
  label: 'Openbare toiletten',
} as const

const meta = {
  component: FilterButton,
  argTypes: {
    filter: {control: false},
    onPressFilter: {control: false},
    testID: {control: false},
  },
  args: {
    filter: FILTER,
    isActive: false,
    onPressFilter: () => undefined,
    testID: 'FilterButton',
  },
  parameters: {
    componentSubtitle: 'Filter knop voor kaart filters',
  },
} satisfies Meta<typeof FilterButton>

export default meta

type Story = StoryObj<typeof meta>

export const Inactive: Story = {}

export const Active: Story = {
  args: {
    isActive: true,
  },
}
