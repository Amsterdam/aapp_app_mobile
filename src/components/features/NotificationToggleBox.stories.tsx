import {NotificationToggleBox} from './NotificationToggleBox'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  argTypes: {
    onChange: {action: 'onChange'},
  },
  component: NotificationToggleBox,
} satisfies Meta<typeof NotificationToggleBox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description: 'U ontvangt meldingen over ophaaldagen voor ‘Mijn adres’.',
    testID: 'Switch',
    value: true,
    onChange: () => {},
  },

  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BEitX3UOKyDPzW84UnmELq/Pushmeldingen?node-id=4799-2156&t=3FbaNkEPQHO2MWPe-4',
    },
  },
}
