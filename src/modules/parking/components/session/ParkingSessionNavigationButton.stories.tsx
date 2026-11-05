import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import type {ComponentProps} from 'react'
import {ParkingSessionNavigationButton} from '@/modules/parking/components/session/ParkingSessionNavigationButton'
import {permitMock} from '@/modules/parking/mocks/permit.mock'
import {
  ParkingSessionStatus,
  type ParkingSession,
  type VisitorParkingSession,
} from '@/modules/parking/types'
import {dayjs} from '@/utils/datetime/dayjs'

const MOCK_PARKING_SESSION: ParkingSession = {
  vehicle_id: 'ABC123',
  visitor_name: 'John Doe',
  created_date_time: '2026-06-16T12:12:00+01:00',
  end_date_time: '2026-06-16T14:46:00+01:00',
  no_endtime: false,
  is_cancelled: false,
  is_paid: false,
  parking_cost: {
    currency: '',
    value: 0,
  },
  ps_right_id: 0,
  remaining_time: 0,
  report_code: '',
  start_date_time: '2026-06-16T12:12:00+01:00',
  status: ParkingSessionStatus.planned,
}

const MOCK_VISITOR_PARKING_SESSION: VisitorParkingSession = {
  vehicle_id: 'ABC123',
  visitor_name: 'John Doe',
  end_date_time: '2026-06-26T12:13:00+01:00',
  no_endtime: false,
  ps_right_id: 0,
  remaining_time: 0,
  report_code: '',
  start_date_time: '2026-06-26T12:12:00+01:00',
  status: ParkingSessionStatus.planned,
}

type StoryArgs = ComponentProps<typeof ParkingSessionNavigationButton> & {
  endTime?: number
  startTime: number
}

const determineStatus = (
  startTime: string,
  endTime?: string,
): ParkingSessionStatus => {
  const now = dayjs()
  const startIsBeforeNow = dayjs(startTime).isBefore(now)
  const endTimeIsAfterNow = !!endTime && dayjs(endTime).isAfter(now)

  if (startIsBeforeNow && endTimeIsAfterNow) {
    return ParkingSessionStatus.active
  }

  if (startIsBeforeNow && !endTimeIsAfterNow) {
    return ParkingSessionStatus.completed
  }

  return ParkingSessionStatus.planned
}

const meta = {
  component: ParkingSessionNavigationButton,
  render: ({parkingSession, startTime, endTime}) => (
    <ParkingSessionNavigationButton
      parkingSession={{
        ...parkingSession,
        start_date_time: dayjs(startTime).toISOString(),
        end_date_time:
          endTime === undefined
            ? parkingSession.end_date_time
            : dayjs(endTime).toISOString(),
      }}
    />
  ),
  parameters: {
    controls: {
      exclude: ['parkingSession'],
      sort: 'none',
    },
  },
  argTypes: {
    startTime: {
      control: 'date',
    },
    endTime: {
      control: 'date',
    },
  },
} satisfies Meta<StoryArgs>

export default meta

type Story = StoryObj<typeof meta>

type SessionOptions = {
  maxDuration?: number
  noEndTime?: boolean
  overruleStatus?: boolean
  status?: ParkingSessionStatus
  visitor?: boolean
}

const today = dayjs().startOf('day')

const createStory = (
  startDateTime: string,
  endDateTime: string,
  {
    maxDuration = 1,
    noEndTime = false,
    status = ParkingSessionStatus.planned,
    visitor = false,
    overruleStatus = false,
  }: SessionOptions = {},
): Story => ({
  args: {
    startTime: dayjs(startDateTime).valueOf(),
    endTime: noEndTime ? undefined : dayjs(endDateTime).valueOf(),
    parkingSession: {
      ...(visitor ? MOCK_VISITOR_PARKING_SESSION : MOCK_PARKING_SESSION),
      start_date_time: startDateTime,
      end_date_time: noEndTime ? '' : endDateTime,
      no_endtime: noEndTime,
      status:
        overruleStatus || noEndTime
          ? status
          : determineStatus(startDateTime, endDateTime),
    },
  },
  parameters: {
    parking: {
      currentPermit: {
        ...permitMock,
        max_session_length_in_days: maxDuration,
        no_endtime: noEndTime,
      },
    },
  },
})

const createSameDayStory = (
  dayOffset: number,
  options?: SessionOptions,
): Story => {
  const date = today.add(dayOffset, 'day')

  return createStory(
    date.hour(10).minute(12).format(),
    date.hour(12).minute(46).format(),
    options,
  )
}

export const Default: Story = createSameDayStory(0)
export const Tomorrow: Story = createSameDayStory(1)
export const Yesterday: Story = createSameDayStory(-1)
export const Past: Story = createSameDayStory(-10)
export const Future: Story = createSameDayStory(10)

export const PreviousYear: Story = createStory(
  today.subtract(1, 'year').hour(10).minute(12).format(),
  today.subtract(1, 'year').hour(12).minute(46).format(),
)
export const NextYear: Story = createStory(
  today.add(1, 'year').hour(10).minute(12).format(),
  today.add(1, 'year').hour(12).minute(46).format(),
)

export const OvernightYesterday: Story = createStory(
  today.subtract(1, 'day').hour(22).minute(12).format(),
  today.hour(2).minute(46).format(),
)
export const OvernightToday: Story = createStory(
  today.hour(22).minute(12).format(),
  today.add(1, 'day').hour(2).minute(46).format(),
)
export const OvernightTomorrow: Story = createStory(
  today.add(1, 'day').hour(22).minute(12).format(),
  today.add(2, 'day').hour(2).minute(46).format(),
)
export const MonthBoundary: Story = createStory(
  today.endOf('month').hour(22).minute(12).second(0).format(),
  today.add(1, 'month').startOf('month').hour(2).minute(46).format(),
)
export const YearBoundary: Story = createStory(
  today.endOf('year').hour(22).minute(12).second(0).format(),
  today.add(1, 'year').startOf('year').hour(2).minute(46).format(),
)

export const ActiveUntilToday: Story = createSameDayStory(0, {
  status: ParkingSessionStatus.active,
  overruleStatus: true,
})
export const ActiveUntilTomorrow: Story = createStory(
  today.hour(10).minute(12).format(),
  today.add(1, 'day').hour(12).minute(46).format(),
  {status: ParkingSessionStatus.active},
)

export const ActiveWithoutEndTimeToday: Story = createSameDayStory(0, {
  status: ParkingSessionStatus.active,
  noEndTime: true,
})

export const ActiveWithoutEndTimePast: Story = createSameDayStory(-10, {
  status: ParkingSessionStatus.active,
  noEndTime: true,
})
