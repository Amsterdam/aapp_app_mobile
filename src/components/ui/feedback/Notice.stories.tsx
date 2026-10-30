import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'
import {Notice} from '@/components/ui/feedback/Notice'

const meta = {
  component: Notice,
  argTypes: {
    variant: {
      options: Object.values(AlertVariant),
      control: {
        type: 'radio',
      },
    },
  },
  args: {
    text: 'Dit is een melding.',
  },
} satisfies Meta<typeof Notice>

export default meta

type Story = StoryObj<typeof Notice>

export const Information: Story = {
  args: {
    variant: AlertVariant.information,
  },
}

export const Warning: Story = {
  args: {
    variant: AlertVariant.warning,
  },
}

export const Positive: Story = {
  args: {
    variant: AlertVariant.positive,
  },
}

export const Negative: Story = {
  args: {
    variant: AlertVariant.negative,
  },
}
