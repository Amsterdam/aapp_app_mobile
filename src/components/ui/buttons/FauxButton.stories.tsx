import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {FauxButton} from './FauxButton'

export default {
  component: FauxButton,
  args: {children: 'Hi!'},
  argTypes: {},
} satisfies Meta<typeof FauxButton>

export const Default: StoryObj<typeof FauxButton> = {}
