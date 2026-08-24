import {Text} from 'react-native'
import {Switch} from './Switch'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: Switch,
  argTypes: {
    onValueChange: {
      action: 'onValueChange',
    },
  },
} satisfies Meta<typeof Switch>

export const Default: StoryObj<typeof Switch> = {
  args: {
    label: <Text>Ik ga akkoord met de voorwaarden</Text>,
    labelPosition: 'end',
    value: true,
  },
}
