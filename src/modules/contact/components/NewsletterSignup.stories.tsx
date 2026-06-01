import {NewsletterSignup} from './NewsletterSignup'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: NewsletterSignup,
} as Meta<typeof NewsletterSignup>

export const Default: StoryObj<typeof NewsletterSignup> = {
  args: {
    variant: 'contact',
  },
}

export const News: StoryObj<typeof NewsletterSignup> = {
  args: {
    variant: 'news',
  },
}
