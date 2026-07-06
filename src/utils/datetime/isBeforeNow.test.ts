import {dayjs} from '@/utils/datetime/dayjs'
import {isBeforeNow} from '@/utils/datetime/isBeforeNow'

const now = '2026-07-06T12:00:00+02:00'

describe('isBeforeNow', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(now))
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns true when a date is before now', () => {
    const oneMilliSecondBefore = dayjs(now).subtract(1, 'millisecond')
    const oneSecondBefore = dayjs(now).subtract(1, 'seconds')
    const oneMinteBefore = dayjs(now).subtract(1, 'minute')
    const yesterday = dayjs(now).subtract(1, 'day')
    const lastYear = dayjs(now).subtract(1, 'year')

    expect(isBeforeNow(oneMilliSecondBefore)).toBe(true)
    expect(isBeforeNow(oneSecondBefore)).toBe(true)
    expect(isBeforeNow(oneMinteBefore)).toBe(true)
    expect(isBeforeNow(yesterday)).toBe(true)
    expect(isBeforeNow(lastYear)).toBe(true)
    expect(isBeforeNow('2026-07-05T12:00:00+02:00')).toBe(true)
    expect(isBeforeNow('2020-07-06T12:00:00+02:00')).toBe(true)
  })

  it('returns false for now', () => {
    expect(isBeforeNow(now)).toBe(false)
  })

  it('returns false for invalid dates', () => {
    expect(isBeforeNow(undefined as unknown as string)).toBe(false)
    expect(isBeforeNow(null)).toBe(false)
    expect(isBeforeNow('undefined')).toBe(false)
  })

  it('returns false for future dates', () => {
    const oneMilliSecondAfter = dayjs(now).add(1, 'millisecond')
    const oneSecondAfter = dayjs(now).add(1, 'seconds')
    const oneMinteAfter = dayjs(now).add(1, 'minute')
    const tomorrow = dayjs(now).add(1, 'day')
    const nextYear = dayjs(now).add(1, 'year')

    expect(isBeforeNow(oneMilliSecondAfter)).toBe(false)
    expect(isBeforeNow(oneSecondAfter)).toBe(false)
    expect(isBeforeNow(oneMinteAfter)).toBe(false)
    expect(isBeforeNow(tomorrow)).toBe(false)
    expect(isBeforeNow(nextYear)).toBe(false)
    expect(isBeforeNow('2026-07-07T12:00:00+02:00')).toBe(false)
    expect(isBeforeNow('2027-07-06T12:00:00+02:00')).toBe(false)
  })
})
