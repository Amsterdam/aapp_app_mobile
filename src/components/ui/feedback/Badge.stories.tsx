import {Meta} from '@storybook/react-native-web-vite'
import {Badge} from './Badge'

export default {
  component: Badge,
  args: {
    value: 3,
  },
} satisfies Meta<typeof Badge>

export const Default = {}

export const Small = {
  args: {
    variant: 'small',
  },
}

export const Info = {
  args: {
    color: 'info',
  },
}
