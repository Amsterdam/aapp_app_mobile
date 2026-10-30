import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Checkbox} from './Checkbox'

const meta = {
  component: Checkbox,
  argTypes: {
    onPress: {
      action: 'onPress',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta

export const Default: StoryObj<typeof Checkbox> = {
  args: {
    label: 'Ik ga akkoord met de voorwaarden',
    labelPosition: 'end',
    isSelected: false,
  },
}
