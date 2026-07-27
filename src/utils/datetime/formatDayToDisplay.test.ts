import {dayjs} from '@/utils/datetime/dayjs'
import {formatDayToDisplay} from '@/utils/datetime/formatDayToDisplay'

describe('formatDayToDisplay', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('returns an empty string for falsy date values', () => {
    expect(formatDayToDisplay('')).toBe('')
    expect(formatDayToDisplay(null as unknown as string)).toBe('')
    expect(formatDayToDisplay(undefined as unknown as string)).toBe('')
  })

  it('formats a string date with weekday and display date', () => {
    expect(formatDayToDisplay('2023-01-01')).toBe('Zondag, 1 januari 2023')
  })

  it('formats a Dayjs date with weekday and display date', () => {
    expect(formatDayToDisplay(dayjs('2023-01-02'))).toBe(
      'Maandag, 2 januari 2023',
    )
  })

  it('returns Vandaag for today when showTodayOrYesterdayAsDate is false', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-10-01T12:00:00'))

    expect(formatDayToDisplay('2025-10-01', false)).toBe('Vandaag')
  })

  it('returns Gisteren for yesterday when showTodayOrYesterdayAsDate is false', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-10-01T12:00:00'))

    expect(formatDayToDisplay('2025-09-30', false)).toBe('Gisteren')
  })

  it('returns the formatted date for today when showTodayOrYesterdayAsDate is true', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-10-01T12:00:00'))

    expect(formatDayToDisplay('2025-10-01', true)).toBe('Woensdag, 1 oktober')
    expect(formatDayToDisplay('2025-10-01')).toBe('Woensdag, 1 oktober')
  })

  it('returns the formatted date for yesterday when showTodayOrYesterdayAsDate is true', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-10-01T12:00:00'))

    expect(formatDayToDisplay('2025-09-30', true)).toBe('Dinsdag, 30 september')
  })
})
