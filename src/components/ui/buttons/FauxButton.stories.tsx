import {FauxButton} from './FauxButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

export default {
  component: FauxButton,
  args: {children: 'Hi!'},
  argTypes: {},
} satisfies Meta<typeof FauxButton>

export const Default: StoryObj<typeof FauxButton> = {}
