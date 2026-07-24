import {formatTimeRangeToDisplay} from '@/utils/datetime/formatTimeRangeToDisplay'

describe('formatTimeRangeToDisplay', () => {
  it('should format time range correctly', () => {
    const startTime = '2023-10-01T12:00:00'
    const endTime = '2023-10-01T14:30:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe(
      '2 uur en 30 minuten',
    )
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'default'}),
    ).toBe('2 uur en 30 minuten')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'short'}),
    ).toBe('2 uur en 30 min')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'veryShort'}),
    ).toBe('2 u 30 min')
  })
  it('should format 0 time difference correctly', () => {
    const startTime = '2023-10-01T12:00:00'
    const endTime = '2023-10-01T12:00:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe('0 minuten')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'default'}),
    ).toBe('0 minuten')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'short'}),
    ).toBe('0 min')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'veryShort'}),
    ).toBe('0 min')
  })
  it('should format exact hours time difference correctly', () => {
    const startTime = '2023-10-01T12:00:00'
    const endTime = '2023-10-01T15:00:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe('3 uur')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'default'}),
    ).toBe('3 uur')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'short'}),
    ).toBe('3 uur')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'veryShort'}),
    ).toBe('3 u')
  })
  it('should format minutes only time difference correctly', () => {
    const startTime = '2023-10-01T12:00:00'
    const endTime = '2023-10-01T12:45:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe('45 minuten')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'default'}),
    ).toBe('45 minuten')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'short'}),
    ).toBe('45 min')
    expect(
      formatTimeRangeToDisplay(startTime, endTime, {format: 'veryShort'}),
    ).toBe('45 min')
  })
  it('should handle undefined values', () => {
    expect(
      formatTimeRangeToDisplay(
        undefined as unknown as string,
        undefined as unknown as string,
      ),
    ).toBe('0 minuten')
  })
  it('should format negative time range correctly', () => {
    const startTime = '2023-10-01T14:30:00'
    const endTime = '2023-10-01T12:00:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe(
      '- 2 uur en 30 minuten',
    )
  })
  it('should format negative minutes only time difference correctly', () => {
    const startTime = '2023-10-01T13:00:00'
    const endTime = '2023-10-01T12:45:00'

    expect(formatTimeRangeToDisplay(startTime, endTime)).toBe('- 15 minuten')
  })
})
