import {getPermitStartDateString} from '@/modules/parking/utils/getPermitStartDateString'

describe('getPermitStartDateString', () => {
  beforeEach(() => {
    jest.useFakeTimers({})
    jest.setSystemTime(new Date('2026-06-26T12:00:00+01:00'))
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllTimers()
  })

  it('should return date and time if started_at is in future and not today.', () => {
    const dateString = getPermitStartDateString('2026-06-28T19:51:41')

    expect(dateString).toBe(
      'U kunt een parkeersessie starten vanaf 28 juni 2026 om 19:51 uur.',
    )
  })

  it('should return only time if started_at is in future and today.', () => {
    const dateString = getPermitStartDateString('2026-06-26T19:51:41')

    expect(dateString).toBe('U kunt een parkeersessie starten vanaf 19:51 uur.')
  })
  it('should return undefined if no started_at is provided.', () => {
    const dateString = getPermitStartDateString(null)

    expect(dateString).toBeUndefined()
  })
})
