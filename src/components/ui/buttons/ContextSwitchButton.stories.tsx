import {ContextSwitchButton} from './ContextSwitchButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ContextSwitchButton,
  argTypes: {
    label: {control: 'text'},
    testID: {table: {disable: true}},
  },
  parameters: {
    controls: {
      include: ['label'],
    },
  },
} satisfies Meta<typeof ContextSwitchButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Selecteer context',
    testID: 'contextSwitchButton',
  },
}
