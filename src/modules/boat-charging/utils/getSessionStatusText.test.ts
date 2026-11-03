import {AddressCity} from '@/modules/address/exports/types'
import {
  type BoatChargingSession,
  ChargingPointStatus,
  NRGStatus,
  SessionStatus,
} from '@/modules/boat-charging/types'
import {getSessionStatusText} from '@/modules/boat-charging/utils/getSessionStatusText'

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

describe.each([true, false])(
  'getSessionStatusText when isPluggedIn is %s',
  isPluggedIn => {
    it.each([undefined, '', '1u 23m'])(
      'returns an empty string without a session when charging time is %s',
      chargingTime => {
        expect(getSessionStatusText(undefined, isPluggedIn, chargingTime)).toBe(
          '',
        )
      },
    )

    it.each([
      {chargingTime: undefined, expected: 'Laden'},
      {chargingTime: '', expected: 'Laden'},
      {chargingTime: '1u 23m', expected: 'Laden - 1u 23m'},
      {chargingTime: '0m', expected: 'Laden - 0m'},
    ])(
      'returns "$expected" while charging with charging time $chargingTime',
      ({chargingTime, expected}) => {
        expect(getSessionStatusText(session, isPluggedIn, chargingTime)).toBe(
          expected,
        )
      },
    )

    describe.each([undefined, '', '1u 23m'])(
      'with charging time %s',
      chargingTime => {
        it.each([
          {status: NRGStatus.Starting, expected: 'Het laden wordt gestart'},
          {status: NRGStatus.Stopping, expected: 'Het laden wordt gestopt'},
          {status: NRGStatus.Completed, expected: 'Het laden is gestopt'},
          {status: NRGStatus.Cancelled, expected: 'Het laden is gestopt'},
        ])(
          'returns "$expected" for status $status, ignoring charging time and plug state',
          ({status, expected}) => {
            expect(
              getSessionStatusText(
                {...session, nrg_status: status},
                isPluggedIn,
                chargingTime,
              ),
            ).toBe(expected)
          },
        )

        it.each([NRGStatus.Created, NRGStatus.CheckedOut])(
          'returns the plug-state instruction for status %s, ignoring charging time',
          status => {
            expect(
              getSessionStatusText(
                {...session, nrg_status: status},
                isPluggedIn,
                chargingTime,
              ),
            ).toBe(isPluggedIn ? 'Start laden' : 'Stekker aansluiten')
          },
        )
      },
    )
  },
)
