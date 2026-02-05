import {IconButton} from './IconButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Icon} from '@/components/ui/media/Icon'
import pressableArgTypes from '@/storybook/utils/pressable-arg-types'

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  argTypes: pressableArgTypes,
}

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
