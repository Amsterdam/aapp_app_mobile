import {action} from 'storybook/actions'
import {NotificationToggleBox} from './NotificationToggleBox'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: NotificationToggleBox,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BEitX3UOKyDPzW84UnmELq/Pushmeldingen?node-id=5139-3537&t=p02Fvd5Y2LMm8mP3-4',
    },
  },
} satisfies Meta<typeof NotificationToggleBox>

export default meta

type Story = StoryObj<typeof meta>

export const On: Story = {
  args: {
    description: 'U ontvangt meldingen over ophaaldagen voor ‘Mijn adres’.',
    testID: 'Switch',
    value: true,
    onChange: action('onChange'),
  },

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BEitX3UOKyDPzW84UnmELq/Pushmeldingen?node-id=5679-3301&t=p02Fvd5Y2LMm8mP3-4',
    },
  },
}
export const Off: Story = {
  args: {
    description: 'U ontvangt meldingen over ophaaldagen voor ‘Mijn adres’.',
    testID: 'Switch',
    value: false,
    onChange: action('onChange'),
  },

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BEitX3UOKyDPzW84UnmELq/Pushmeldingen?node-id=5139-3564&t=p02Fvd5Y2LMm8mP3-4',
    },
  },
}
export const OffWithError: Story = {
  args: {
    description: 'U ontvangt meldingen over ophaaldagen voor ‘Mijn adres’.',
    testID: 'Switch',
    value: false,
    onChange: action('onChange'),
    error:
      'Meldingen konden niet worden aangezet. Controleer uw internetverbinding en probeer het opnieuw.',
  },

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BEitX3UOKyDPzW84UnmELq/Pushmeldingen?node-id=5689-3736&t=p02Fvd5Y2LMm8mP3-4',
    },
  },
}
export const Loading: Story = {
  args: {
    description: 'U ontvangt meldingen over ophaaldagen voor ‘Mijn adres’.',
    testID: 'Switch',
    value: false,
    loading: true,
    onChange: action('onChange'),
  },

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BEitX3UOKyDPzW84UnmELq/Pushmeldingen?node-id=5678-3242&t=p02Fvd5Y2LMm8mP3-4',
    },
  },
}
