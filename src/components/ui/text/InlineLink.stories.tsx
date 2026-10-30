import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import pressableArgTypes from '@/storybook/utils/pressable-arg-types'
import {InlineLink} from './InlineLink'

const meta = {
  component: InlineLink,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/HUuOrfCRCitJNEJh6bf9Ai/Amsterdam-app---productie?node-id=3048-3307&t=VY39yWQ7u1ZmWHKc-4',
    },
  },
  argTypes: {
    onPress: pressableArgTypes.onPress,
  },
} satisfies Meta<typeof InlineLink>

export default meta

type Story = StoryObj<typeof InlineLink>

/**
 * Navigates to another screen within the app.
 */
export const InternalBody: Story = {
  args: {
    children: 'Internal body',
    variant: 'internal',
    testID: 'actionLink',
  },
}

/**
 * Navigates to another screen within the app.
 */
export const InternalIntro: Story = {
  args: {
    children: 'Internal intro',
    variant: 'internal',
    testID: 'actionLink',
    phraseVariant: 'intro',
  },
}

/**
 * Opens a link outside the app.
 */
export const External: Story = {
  args: {
    children: 'External',
    variant: 'external',
    testID: 'actionLink',
  },
}

/**
 * Performs an action within the app.
 */
export const Action: Story = {
  args: {
    children: 'Action',
    variant: 'action',
    actionIcon: {
      name: 'download',
    },
    testID: 'actionLink',
  },
}

/**
 * Opens additional content or a choice in a bottom sheet. When used to change the active context, the label must clearly state what the user can choose or change (context selector).
 */
export const Disclosure: Story = {
  args: {
    children: 'Kies een ander ...',
    variant: 'disclosure',
    testID: 'actionLink',
  },
}
