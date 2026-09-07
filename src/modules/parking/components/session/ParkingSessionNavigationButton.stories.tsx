import {ParkingSessionStatus} from '../../types'
import {ParkingSessionNavigationButton} from './ParkingSessionNavigationButton'
import type {Meta, StoryObj} from '@storybook/react-native-web-vite'

const meta = {
  component: ParkingSessionNavigationButton,
} satisfies Meta<typeof ParkingSessionNavigationButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    parkingSession: {
      vehicle_id: 'ABC123',
      visitor_name: 'John Doe',
      created_date_time: '2024-12-31 8:00:00 UTC',
      end_date_time: '2025-12-31 16:00:00 UTC',
      is_cancelled: false,
      is_paid: false,
      no_endtime: false,
      parking_cost: {
        currency: '',
        value: 0,
      },
      ps_right_id: 0,
      remaining_time: 0,
      report_code: '',
      start_date_time: '2025-12-31 8:00:00 UTC',
      status: ParkingSessionStatus.planned,
    },
  },
}
