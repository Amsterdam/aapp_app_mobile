import type {Decorator, Meta, StoryObj} from '@storybook/react-native-web-vite'
import {useEffect, type ReactNode} from 'react'
import {View} from 'react-native'
import {BackgroundColorArea} from '@/components/ui/containers/BackgroundColorArea'
import {Box} from '@/components/ui/containers/Box'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {ParkingDashboard} from '@/modules/parking/components/dashboard/ParkingDashboard'
import {permitMock} from '@/modules/parking/mocks/permit.mock'
import {parkingApi} from '@/modules/parking/service'
import {parkingSlice} from '@/modules/parking/slice'
import {
  ParkingPermitScope,
  ParkingSessionStatus,
  type ParkingSession,
  type VisitorParkingSession,
} from '@/modules/parking/types'
import {setNextResponse} from '@/storybook/mocks/api'
import type {ParkingStorybookParameters} from '@/storybook/mocks/parking'
import {dayjs} from '@/utils/datetime/dayjs'
import {parkingDashboardMockHandler} from '../../service.mock'

const PARKING_DASHBOARD_VISITOR_VEHICLE_ID = '12AB34'

function createParkingSessions<Session extends VisitorParkingSession>(
  sessionCount: number,
  isVisitor: true,
): Session[]

function createParkingSessions<Session extends ParkingSession>(
  sessionCount: number,
  isVisitor: false,
  noEndTime?: boolean,
): Session[]

function createParkingSessions(
  sessionCount: number,
  isVisitor: boolean,
  noEndTime?: boolean,
) {
  return Array.from({length: sessionCount}, (_, index) => {
    const startDateTime = dayjs().subtract(index + 20, 'minute')

    const defaultSessionData: Partial<ParkingSession> = {
      end_date_time: startDateTime.add(2, 'hour').toISOString(),
      ps_right_id: index + 1,
      remaining_time: 0,
      start_date_time: startDateTime.toISOString(),
      status: ParkingSessionStatus.active,
    }

    if (isVisitor) {
      return {
        vehicle_id: PARKING_DASHBOARD_VISITOR_VEHICLE_ID,
        visitor_name: 'John Doe',
        report_code: '10000001',
        no_endtime: false,
        ...defaultSessionData,
      }
    } else {
      return {
        vehicle_id: `12AB${String(index + 34).padStart(2, '0')}`,
        visitor_name: 'Jane Doe',
        report_code: '10000000',
        created_date_time: startDateTime.toISOString(),
        no_endtime: noEndTime,
        is_cancelled: false,
        is_paid: true,
        parking_cost: {
          currency: 'EUR',
          value: 0,
        },
        ...defaultSessionData,
      }
    }
  })
}

type ParkingDashboardStoryStateProps = {
  children: ReactNode
  parameters: ParkingStorybookParameters
}

const ParkingDashboardStoryState = ({
  children,
  parameters,
}: ParkingDashboardStoryStateProps) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const reportCode =
      parameters.accountScope === ParkingPermitScope.permitHolder
        ? '10000000'
        : '10000001'

    dispatch(parkingApi.util.resetApiState())
    dispatch(
      parkingSlice.actions.setParkingAccount({
        reportCode,
        scope: parameters.accountScope ?? ParkingPermitScope.permitHolder,
      }),
    )
    dispatch(parkingSlice.actions.setCurrentAccount(reportCode))
    dispatch(
      parkingSlice.actions.setVisitorVehicleId(parameters.visitorVehicleId),
    )

    return () => {
      dispatch(parkingApi.util.resetApiState())
      dispatch(parkingSlice.actions.reset())

      dispatch(parkingSlice.actions.removeParkingAccount(reportCode))
      dispatch(parkingSlice.actions.setVisitorVehicleId(undefined))
    }
  }, [dispatch, parameters.accountScope, parameters.visitorVehicleId])

  return children
}

const parkingDashboardDecorator: Decorator = (Story, context) => {
  const parameters = context.parameters.parking as ParkingStorybookParameters

  setNextResponse(parkingDashboardMockHandler(parameters))

  return (
    <ParkingDashboardStoryState parameters={parameters}>
      <View>
        <BackgroundColorArea
          color="primary"
          height={320}
        />
        <Box
          insetBottom="md"
          insetHorizontal="md"
          insetTop="lg">
          <Story />
        </Box>
      </View>
    </ParkingDashboardStoryState>
  )
}

const meta = {
  component: ParkingDashboard,
  decorators: [parkingDashboardDecorator],
  beforeEach: () => {},
  tags: ['!autodocs'],
} satisfies Meta<typeof ParkingDashboard>

export default meta

type Story = StoryObj<typeof meta>

export const PermitHolder: Story = {
  parameters: {
    parking: {
      currentPermit: {
        ...permitMock,
        permit_name: 'Bezoekersparkeervergunning',
        money_balance_applicable: true,
      },
    },
    parkingDashboard: {
      accountScope: ParkingPermitScope.permitHolder,
      parkingSessions: createParkingSessions(1, false),
    } satisfies ParkingStorybookParameters,
  },
}

export const Visitor: Story = {
  parameters: {
    parking: {
      currentPermit: {
        ...permitMock,
        money_balance_applicable: false,
      },
      accountScope: ParkingPermitScope.visitor,
    } satisfies ParkingStorybookParameters,
  },
}

export const PermitNotYetActive: Story = {
  parameters: {
    parking: {
      currentPermit: {
        ...permitMock,
        permit_name: 'Bezoekersparkeervergunning',
        max_session_length_in_days: 1,
        money_balance_applicable: true,
        started_at: dayjs().add(3, 'day').toISOString(),
      },
      accountScope: ParkingPermitScope.permitHolder,
    } satisfies ParkingStorybookParameters,
  },
}

export const NoEndTimePermit: Story = {
  parameters: {
    parking: {
      currentPermit: {
        ...permitMock,
        permit_name: 'Mantelzorger',
        money_balance_applicable: false,
        no_endtime: true,
      },
      accountScope: ParkingPermitScope.permitHolder,
      parkingSessions: createParkingSessions(1, false, true),
    } satisfies ParkingStorybookParameters,
  },
}

export const NoUpcomingSessions: Story = {
  parameters: {
    parking: {
      currentPermit: {
        ...permitMock,
        permit_name: 'Bezoekersparkeervergunning',
        money_balance_applicable: true,
      },
      accountScope: ParkingPermitScope.permitHolder,
      parkingSessions: [],
    } satisfies ParkingStorybookParameters,
  },
}

export const TwoUpcomingSessions: Story = {
  parameters: {
    parking: {
      currentPermit: {
        ...permitMock,
        permit_name: 'Bezoekersparkeervergunning',
        money_balance_applicable: true,
      },
      accountScope: ParkingPermitScope.permitHolder,
      parkingSessions: createParkingSessions(2, false),
    } satisfies ParkingStorybookParameters,
  },
}

export const SixUpcomingSessions: Story = {
  parameters: {
    parking: {
      currentPermit: {
        ...permitMock,
        permit_name: 'Bezoekersparkeervergunning',
        money_balance_applicable: true,
      },
      accountScope: ParkingPermitScope.permitHolder,
      parkingSessions: createParkingSessions(6, false),
    } satisfies ParkingStorybookParameters,
  },
}

export const VisitorWithLicensePlateAndTwoActiveSessions: Story = {
  parameters: {
    parking: {
      currentPermit: {
        ...permitMock,
        report_code: '10000001',
        money_balance_applicable: false,
      },
      accountScope: ParkingPermitScope.visitor,
      visitorParkingSessions: createParkingSessions(2, true),
      visitorVehicleId: PARKING_DASHBOARD_VISITOR_VEHICLE_ID,
    } satisfies ParkingStorybookParameters,
  },
}
