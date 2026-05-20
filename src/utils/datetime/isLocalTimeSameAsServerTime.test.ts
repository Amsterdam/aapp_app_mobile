import {isLocalTimeSameAsServerTime} from '@/utils/datetime/isLocalTimeSameAsServerTime'

describe('isLocalTimeSameAsServerTime', () => {
  beforeEach(() => {
    jest.spyOn(Intl, 'DateTimeFormat').mockReturnValue({
      resolvedOptions: () => ({
        timeZone: 'Europe/Amsterdam',
        locale: 'nl',
        calendar: 'gregory',
        numberingSystem: 'latn',
      }),
      format: () => '',
      formatToParts: () => [],
    })
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns true when serverTime is missing', () => {
    expect(isLocalTimeSameAsServerTime()).toBe(true)
  })

  it('returns true when local time differs by less than 2 minutes', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-05-19T10:00:00.000Z'))

    expect(isLocalTimeSameAsServerTime('2026-05-19T09:58:30.000Z')).toBe(true)
    expect(isLocalTimeSameAsServerTime('2026-05-19T10:01:30.000Z')).toBe(true)
  })

  it('returns false when local time differs by exactly 2 minutes', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-05-19T10:00:00.000Z'))

    expect(isLocalTimeSameAsServerTime('2026-05-19T09:58:00.000Z')).toBe(false)
    expect(isLocalTimeSameAsServerTime('2026-05-19T10:02:00.000Z')).toBe(false)
  })

  it('returns false when local time differs by more than 2 minutes', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-05-19T10:00:00.000Z'))

    expect(isLocalTimeSameAsServerTime('2026-05-19T09:55:00.000Z')).toBe(false)
    expect(isLocalTimeSameAsServerTime('2026-05-19T10:05:00.000Z')).toBe(false)
  })

  it('returns false when timezone differs even if local time differs by less than 2 minutes', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-05-19T10:00:00.000Z'))
    jest.spyOn(Intl, 'DateTimeFormat').mockReturnValue({
      resolvedOptions: () => ({
        timeZone: 'America/New_York',
        locale: 'nl',
        calendar: 'gregory',
        numberingSystem: 'latn',
      }),
      format: () => '',
      formatToParts: () => [],
    })

    expect(isLocalTimeSameAsServerTime('2026-05-19T09:58:30.000Z')).toBe(false)
  })
})
