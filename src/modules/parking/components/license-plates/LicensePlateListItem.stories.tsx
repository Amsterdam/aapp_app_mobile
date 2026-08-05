import {LicensePlateListItem} from './LicensePlateListItem'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: LicensePlateListItem,
} satisfies Meta<typeof LicensePlateListItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    licensePlate: {
      id: '3',
      vehicle_id: 'ABC123',
      visitor_name: 'John Doe',
    },
    number: '1',
  },
}

export const Future: Story = {
  args: {
    licensePlate: {
      id: '3',
      vehicle_id: '123ABC',
      visitor_name: 'Jane Doe',
      is_future: true,
      activated_at: '01-01-2027',
    },
    number: '1',
  },
}
