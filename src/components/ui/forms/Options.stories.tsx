import {Options, Option as OptionType} from './Options'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {LayoutOrientation} from '@/components/ui/types'
import {QuestionType} from '@/modules/survey/types'

const meta: Meta<typeof Options> = {
  argTypes: {
    onChange: {action: 'onChange'},
  },
  component: Options,
}

export default meta

type Story = StoryObj<typeof Options>

const options: OptionType<string>[] = [
  {label: 'Option 1', value: '1'},
  {label: 'Option 2', value: '2'},
  {label: 'Option 3', value: '3'},
]

export const Radio: Story = {
  args: {
    options,
    type: QuestionType.radio,
    orientation: LayoutOrientation.horizontal,
    label: 'Radio Options',
    testID: 'radioButton',
  },
}

export const Checkbox: Story = {
  args: {
    options,
    type: QuestionType.checkbox,
    orientation: LayoutOrientation.vertical,
    label: 'Checkbox Options',
    testID: 'checkboxButton',
  },
}

export const Rating: Story = {
  args: {
    options,
    type: QuestionType.rating,
    orientation: LayoutOrientation.horizontal,
    label: 'Rating Options',
    testID: 'ratingButton',
    value: '2',
  },
}

export const SelectionButtons: Story = {
  args: {
    options,
    type: QuestionType.selection_buttons,
    orientation: LayoutOrientation.horizontal,
    label: 'Selection Buttons',
    testID: 'selectionButton',
  },
}
