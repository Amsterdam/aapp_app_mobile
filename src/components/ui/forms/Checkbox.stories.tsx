import {Checkbox} from './Checkbox'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

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
