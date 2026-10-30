import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {LicensePlateForm} from './LicensePlateForm'

const meta = {
  component: LicensePlateForm,
  args: {
    licensePlateId: '1',
  },
} satisfies Meta<typeof LicensePlateForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
