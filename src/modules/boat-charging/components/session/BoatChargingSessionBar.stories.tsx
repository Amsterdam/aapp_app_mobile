import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import {Size} from '@/components/ui/layout/Size'
import {AddressCity} from '@/modules/address/exports/types'
import {BoatChargingSessionBar} from '@/modules/boat-charging/components/session/BoatChargingSessionBar'
import {
  type BoatChargingSession,
  ChargingPointStatus,
  NRGStatus,
  SessionStatus,
} from '@/modules/boat-charging/types'
import {Canvas} from '@/storybook/components'
import {BoatChargingStorybookProvider} from '../../../../../.storybook/mocks/boat-charging'

const session: BoatChargingSession = {
  created_date_time: '2026-01-01T10:00:00Z',
  currency: 'EUR',
  email: 'app@amsterdam.nl',
  id: 'session-1',
  kwh: 1,
  location: {
    address: {
      bagId: 'address-1',
      city: AddressCity.Amsterdam,
      number: 1,
      postcode: '1011AB',
      street: 'Amstel',
    },
    available_sockets: 1,
    id: 'location-1',
    max_kw: 22,
    name: 'Amstel',
    opening_times: {
      exceptional_closings: [],
      exceptional_openings: [],
      regular_hours: [],
      twentyfourseven: true,
    },
    status: ChargingPointStatus.OPERATIVE,
    total_sockets: 2,
  },
  nrg_status: NRGStatus.Charging,
  socket_number: '1',
  start_date_time: '2026-01-01T10:00:00Z',
  station_id: 'station-1',
  status: SessionStatus.ACTIVE,
  total_cost: 1,
}

const meta = {
  component: BoatChargingSessionBar,
} satisfies Meta<typeof BoatChargingSessionBar>

export default meta

type Story = StoryObj<typeof meta>

export const SingleActiveSession: Story = {
  decorators: [
    Story => (
      <BoatChargingStorybookProvider
        chargingTimeVeryShortString="1u 23m"
        sessions={[session]}>
        <Story />
      </BoatChargingStorybookProvider>
    ),
  ],
}

export const MultipleActiveSessions: Story = {
  decorators: [
    Story => (
      <BoatChargingStorybookProvider
        sessions={[
          session,
          {...session, id: 'session-2'},
          {...session, id: 'session-3'},
        ]}>
        <Story />
      </BoatChargingStorybookProvider>
    ),
  ],
}

export const NoActiveSessions: Story = {
  decorators: [
    Story => (
      <Canvas highlight>
        <Size height={40}>
          <BoatChargingStorybookProvider sessions={[]}>
            <Story />
          </BoatChargingStorybookProvider>
        </Size>
      </Canvas>
    ),
  ],
}
