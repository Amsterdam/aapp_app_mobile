import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import type {ComponentProps} from 'react'
import {ParkingSessionsFlatList} from '@/modules/parking/components/sessionsList/ParkingSessionFlatList'
import {ParkingSessionsSectionList} from '@/modules/parking/components/sessionsList/ParkingSessionSectionList'
import {permitMock} from '@/modules/parking/mocks/permit.mock'
import {
  ParkingSessionStatus,
  type ParkingSession,
} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

const createParkingSession = (
  dayOffset: number,
  vehicleId: string,
): ParkingSession => {
  const startDateTime = dayjs()
    .subtract(7, 'day')
    .startOf('day')
    .add(dayOffset, 'day')
    .hour(9)
    .minute(30)

  return {
    vehicle_id: vehicleId,
    visitor_name: 'John Doe',
    created_date_time: startDateTime.toISOString(),
    end_date_time: startDateTime.add(2, 'hour').toISOString(),
    no_endtime: false,
    is_cancelled: false,
    is_paid: false,
    parking_cost: {
      currency: 'EUR',
      value: 0,
    },
    ps_right_id: 0,
    remaining_time: 0,
    report_code: '',
    start_date_time: startDateTime.toISOString(),
    status: ParkingSessionStatus.planned,
  }
}

const parkingSessions = [
  createParkingSession(0, 'ABC123'),
  createParkingSession(0, 'DEF456'),
  createParkingSession(1, 'GHI789'),
  createParkingSession(2, 'GHI789'),
  createParkingSession(2, 'ABC123'),
  createParkingSession(3, 'GHI789'),
]

type StoryArgs = ComponentProps<typeof ParkingSessionsFlatList> & {
  inSections: boolean
}

const meta = {
  component: ParkingSessionsFlatList,
  args: {
    inSections: false,
    isLoading: false,
    sessions: parkingSessions,
  },
  argTypes: {
    inSections: {
      control: 'boolean',
      description:
        'Storybook only prop which toggles between ParkingSessionsFlatList (ungrouped) and ParkingSessionsSectionList (grouped).',
    },
  },
  render: ({inSections, sessions}) =>
    inSections ? (
      <ParkingSessionsSectionList
        isLoading={false}
        sessions={sessions}
      />
    ) : (
      <ParkingSessionsFlatList
        isLoading={false}
        sessions={sessions}
      />
    ),
  parameters: {
    controls: {
      exclude: [
        'isLoading',
        'onViewableItemsChanged',
        'sessions',
        'ListEmptyComponent',
      ],
    },
    parking: {
      currentPermit: {
        ...permitMock,
        max_session_length_in_days: 1,
      },
    },
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sessions: parkingSessions,
  },
}
