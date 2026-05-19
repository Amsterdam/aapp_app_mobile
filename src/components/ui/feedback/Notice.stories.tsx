import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Notice} from '@/components/ui/feedback/Notice'
import {AlertVariant} from '@/components/ui/feedback/alert/Alert.types'

const meta: Meta<typeof Notice> = {
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
}

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
