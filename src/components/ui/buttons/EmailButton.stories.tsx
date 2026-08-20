import {EmailButton} from './EmailButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: EmailButton,
  argTypes: {},
} satisfies Meta<typeof EmailButton>

export const Default: StoryObj<typeof EmailButton> = {
  args: {
    email: 'ontwikkelingzeeburgereiland@amsterdam.nl',
    subject: 'Vraag over zeeburg.',
  },
}
