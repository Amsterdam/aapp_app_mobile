import {action} from 'storybook/actions'
import {NotificationToggleBox} from './NotificationToggleBox'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: NotificationToggleBox,
} satisfies Meta<typeof NotificationToggleBox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description: 'U ontvangt meldingen over ophaaldagen voor ‘Mijn adres’.',
    testID: 'Switch',
    value: true,
    onChange: action('onChange'),
  },

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BEitX3UOKyDPzW84UnmELq/Pushmeldingen?node-id=4799-2156&t=3FbaNkEPQHO2MWPe-4',
    },
  },
}
