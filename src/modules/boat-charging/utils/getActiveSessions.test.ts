import type {BoatChargingSession} from '@/modules/boat-charging/types'
import {NRGStatus, SessionStatus} from '@/modules/boat-charging/types'
import {getActiveSessions} from '@/modules/boat-charging/utils/getActiveSessions'

const createSession = (
  overrides: Partial<BoatChargingSession> = {},
): BoatChargingSession => ({
  created_date_time: '2026-01-01T00:00:00Z',
  currency: 'EUR',
  end_date_time: '2026-01-01T01:00:00Z',
  id: 'session-1',
  kwh: 1,
  location: {} as BoatChargingSession['location'],
  nrg_status: NRGStatus.Charging,
  socket_number: '1',
  start_date_time: '2026-01-01T00:00:00Z',
  station_id: 'station-1',
  status: SessionStatus.ACTIVE,
  total_cost: 1,
  ...overrides,
})

describe('getActiveSessions', () => {
  it('should return undefined when sessions is nullish', () => {
    expect(getActiveSessions(undefined)).toBeUndefined()
    expect(
      getActiveSessions(null as unknown as BoatChargingSession[]),
    ).toBeUndefined()
  })

  it('should return an empty array when there are no matching sessions', () => {
    expect(getActiveSessions([])).toEqual([])

    expect(
      getActiveSessions([
        createSession({id: 'session-1', status: SessionStatus.COMPLETED}),
        createSession({id: 'session-2', nrg_status: NRGStatus.Completed}),
        createSession({id: 'session-3', nrg_status: NRGStatus.Cancelled}),
      ]),
    ).toEqual([])
  })

  it('should include sessions with valid active status and charging states', () => {
    const checkedOutSession = createSession({
      id: 'session-checked-out',
      nrg_status: NRGStatus.CheckedOut,
    })
    const chargingSession = createSession({
      id: 'session-charging',
      nrg_status: NRGStatus.Charging,
    })

    expect(getActiveSessions([checkedOutSession, chargingSession])).toEqual([
      checkedOutSession,
      chargingSession,
    ])
  })

  it('should include sessions with nullish status when nrg_status is active', () => {
    const nullStatusSession = createSession({
      id: 'session-null-status',
      status: null as unknown as SessionStatus,
    })
    const undefinedStatusSession = createSession({
      id: 'session-undefined-status',
      status: undefined as unknown as SessionStatus,
    })

    expect(
      getActiveSessions([nullStatusSession, undefinedStatusSession]),
    ).toEqual([nullStatusSession, undefinedStatusSession])
  })

  it('should exclude sessions when nrg_status is nullish', () => {
    const nullNrgStatusSession = createSession({
      id: 'session-null-nrg-status',
      nrg_status: null as unknown as NRGStatus,
    })
    const undefinedNrgStatusSession = createSession({
      id: 'session-undefined-nrg-status',
      nrg_status: undefined as unknown as NRGStatus,
    })

    expect(
      getActiveSessions([nullNrgStatusSession, undefinedNrgStatusSession]),
    ).toEqual([])
  })

  it('should prioritize completed status over an otherwise active nrg_status', () => {
    const completedChargingSession = createSession({
      id: 'session-completed-charging',
      nrg_status: NRGStatus.Charging,
      status: SessionStatus.COMPLETED,
    })

    expect(getActiveSessions([completedChargingSession])).toEqual([])
  })
})
