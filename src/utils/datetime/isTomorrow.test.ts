import {dayjs} from '@/utils/datetime/dayjs'
import {isTomorrow} from '@/utils/datetime/isTomorrow'

describe('isTomorrow', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns true when a string date is tomorrow relative to the base date', () => {
    const baseDate = dayjs('2026-06-01T10:30:00.000Z')

    expect(isTomorrow('2026-06-02T01:15:00.000Z', baseDate)).toBe(true)
  })

  it('returns true when a Dayjs date is tomorrow relative to the base date', () => {
    const baseDate = dayjs('2026-06-01T23:59:00.000Z')

    expect(isTomorrow(dayjs('2026-06-02T01:01:00.000Z'), baseDate)).toBe(true)
  })

  it('returns false when the date is the same calendar day as the base date', () => {
    const baseDate = dayjs('2026-06-01T08:00:00.000Z')

    expect(isTomorrow('2026-06-01T23:59:59.000Z', baseDate)).toBe(false)
  })

  it('returns false when the date is more than one day after the base date', () => {
    const baseDate = dayjs('2026-06-01T08:00:00.000Z')

    expect(isTomorrow('2026-06-03T08:00:00.000Z', baseDate)).toBe(false)
  })

  it('returns false for an invalid string date', () => {
    const baseDate = dayjs('2026-06-01T08:00:00.000Z')

    expect(isTomorrow('invalid-date', baseDate)).toBe(false)
  })

  it('returns false when date is null', () => {
    const baseDate = dayjs('2026-06-01T08:00:00.000Z')

    expect(isTomorrow(null as unknown as string, baseDate)).toBe(false)
  })

  it('returns false when date is undefined', () => {
    const baseDate = dayjs('2026-06-01T08:00:00.000Z')

    expect(isTomorrow(undefined as unknown as string, baseDate)).toBe(false)
  })

  it('uses the current date when baseDate is omitted', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-06-01T12:00:00.000Z'))

    expect(isTomorrow('2026-06-02T09:00:00.000Z')).toBe(true)
  })

  it('uses the current date when baseDate is undefined', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-06-01T12:00:00.000Z'))

    expect(isTomorrow('2026-06-02T09:00:00.000Z', undefined)).toBe(true)
  })

  it('throws when baseDate is null', () => {
    expect(() =>
      isTomorrow('2026-06-02T09:00:00.000Z', null as unknown as never),
    ).toThrow("Cannot read properties of null (reading 'startOf')")
  })
})
