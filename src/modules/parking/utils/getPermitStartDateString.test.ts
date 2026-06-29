import {
  BASE_STRING,
  getPermitStartDateString,
} from '@/modules/parking/utils/getPermitStartDateString'

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

    expect(dateString).toBe(`${BASE_STRING} 28 juni, 19.51 uur.`)
  })

  it('should return only time if started_at is in future and today.', () => {
    const dateString = getPermitStartDateString('2026-06-26T19:51:41')

    expect(dateString).toBe(`${BASE_STRING} vandaag, 19.51 uur.`)
  })
  it('should return empty string if no started_at is provided or is an invalid date.', () => {
    expect(getPermitStartDateString(null)).toBe('')
    expect(getPermitStartDateString(undefined as unknown as null)).toBe('')
    expect(getPermitStartDateString('')).toBe('')
    expect(getPermitStartDateString('INVALID_DATE')).toBe('')
  })
})
