import {formatDateTimeToDisplay} from '@/utils/datetime/formatDateTimeToDisplay'

describe('formatDateTimeToDisplay', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2026-06-29T12:00:00+02:00'))
  })
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return the date as date, without year if date is in current year.', () => {
    expect(formatDateTimeToDisplay('2026-06-29T12:01:00')).toBe(
      '29 juni, 12.01 uur',
    )
  })

  it('should return the date as date, with year if date is not in current year.', () => {
    expect(formatDateTimeToDisplay('2025-06-29T12:01:00')).toBe(
      '29 juni 2025, 12.01 uur',
    )
  })

  it('should return the date with today, if date is today.', () => {
    expect(formatDateTimeToDisplay('2026-06-29T12:01:00', false)).toBe(
      'Vandaag, 12.01 uur',
    )
  })

  it('should return an empty string for an empty input', () => {
    expect(formatDateTimeToDisplay('')).toBe('')
    expect(formatDateTimeToDisplay(null as unknown as string)).toBe('')
    expect(formatDateTimeToDisplay(undefined as unknown as string)).toBe('')
  })
})
