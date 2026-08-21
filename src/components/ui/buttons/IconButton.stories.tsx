import {IconButton} from './IconButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Icon} from '@/components/ui/media/Icon'
import pressableArgTypes from '@/storybook/utils/pressable-arg-types'

const meta = {
  component: IconButton,
  argTypes: pressableArgTypes,
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    icon: (
      <Icon
        isFilled
        name="person"
        size="lg"
        testID="Icon"
      />
    ),
    badgeValue: 7,
  },
}
