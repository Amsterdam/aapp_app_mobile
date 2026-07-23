import {AddressCity} from '@/modules/address/types'
import {
  ChargingPointStatus,
  NRGStatus,
  SessionStatus,
  type BoatChargingSession,
} from '@/modules/boat-charging/types'
import {groupBoatChargingSessionsByDate} from '@/modules/boat-charging/utils/groupBoatChargingSessionsByDate'

const createBoatChargingSession = (
  id: string,
  startDateTime: string,
): BoatChargingSession => ({
  created_date_time: '2026-07-20T09:00:00Z',
  currency: 'EUR',
  end_date_time: '2026-07-20T10:00:00Z',
  id,
  kwh: 12.5,
  location: {
    address: {
      city: AddressCity.Amsterdam,
      number: 1,
      postcode: '1000AA',
      street: 'Damrak',
      bagId: '1234',
    },
    id: 'location-1',
    max_kw: 22,
    name: 'Damrak steiger',
    opening_times: {
      exceptional_closings: [],
      exceptional_openings: [],
      regular_hours: [],
      twentyfourseven: true,
    },
    status: ChargingPointStatus.OPERATIVE,
    total_sockets: 2,
  },
  nrg_status: NRGStatus.Completed,
  socket_number: '1',
  start_date_time: startDateTime,
  station_id: 'station-1',
  status: SessionStatus.COMPLETED,
  total_cost: 15.75,
})

describe('groupBoatChargingSessionsByDate', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return an empty array for undefined or nullish sessions', () => {
    expect(groupBoatChargingSessionsByDate(undefined)).toEqual([])
    expect(
      groupBoatChargingSessionsByDate(null as unknown as BoatChargingSession[]),
    ).toEqual([])
  })

  it('should return an empty array for an empty sessions array', () => {
    expect(groupBoatChargingSessionsByDate([])).toEqual([])
  })

  it('should sort sessions descending by start date and group sessions on the same day', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-07-23T12:00:00Z'))

    const oldestSession = createBoatChargingSession(
      'session-1',
      '2026-07-21T08:00:00Z',
    )
    const sameDayEarlierSession = createBoatChargingSession(
      'session-2',
      '2026-07-22T09:00:00Z',
    )
    const sameDayLatestSession = createBoatChargingSession(
      'session-3',
      '2026-07-22T11:00:00Z',
    )

    expect(
      groupBoatChargingSessionsByDate([
        oldestSession,
        sameDayEarlierSession,
        sameDayLatestSession,
      ]),
    ).toEqual([
      {
        title: 'Gisteren',
        data: [sameDayLatestSession, sameDayEarlierSession],
      },
      {
        title: '21 juli',
        data: [oldestSession],
      },
    ])
  })

  it('should include the year in section titles for sessions outside the current year', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-07-23T12:00:00Z'))

    const previousYearSession = createBoatChargingSession(
      'session-4',
      '2025-12-31T23:00:00Z',
    )

    expect(groupBoatChargingSessionsByDate([previousYearSession])).toEqual([
      {
        title: '31 december 2025',
        data: [previousYearSession],
      },
    ])
  })
})
