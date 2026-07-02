import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

describe('formatDateToDisplay', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return the full date, when the date is not in the current year', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-09-01T12:00:00'))
    expect(formatDateToDisplay('2026-01-01')).toBe('1 januari 2026')
    jest.useRealTimers()
    expect(formatDateToDisplay('2025-01-01')).toBe('1 januari 2025')
  })

  it('should only return day and month, when date is in the current year', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-10-01T12:00:00'))
    expect(formatDateToDisplay('2025-01-01')).toBe('1 januari')
    jest.useRealTimers()
  })

  it('should return "vandaag" for a date that is today and todayAsDate is set accordingly', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-10-01T12:00:00'))
    expect(formatDateToDisplay('2025-10-01', false)).toBe('Vandaag')
    expect(formatDateToDisplay('2025-10-01', true)).toBe('1 oktober')
    expect(formatDateToDisplay('2025-10-01')).toBe('1 oktober')
    jest.useRealTimers()
  })

  it('should return an empty string for an empty input', () => {
    expect(formatDateToDisplay('')).toBe('')
  })

  it('should return null or undefined for an empty input', () => {
    expect(formatDateToDisplay(null as unknown as string)).toBe('')
    expect(formatDateToDisplay(undefined as unknown as string)).toBe('')
  })

  it('should format and cut the date string correctly', () => {
    expect(formatDateToDisplay('2023-01-01')).toBe('1 januari 2023')
  })

  it('should return "Vandaag" for a date today and with todayAsDate=false', () => {
    const today = new Date()

    expect(formatDateToDisplay(today.toISOString(), false)).toBe('Vandaag')
  })

  it('should return the date for a date today and with todayAsDate=true', () => {
    const today = new Date()

    expect(formatDateToDisplay(today.toISOString(), true)).not.toBe('Vandaag')
    expect(formatDateToDisplay(today.toISOString())).not.toBe('Vandaag')
  })
})
