import {formatTimeDurationToDisplay} from '@/utils/datetime/formatTimeDurationToDisplay'

describe('formatTimeDurationToDisplay', () => {
  it("should return '0 uur' if input is 0 and smallest unit is 'hours'", () => {
    expect(
      formatTimeDurationToDisplay(0, 'hour', {smallestUnit: 'hours'}),
    ).toBe('0 uur')

    expect(
      formatTimeDurationToDisplay(0, 'minute', {smallestUnit: 'hours'}),
    ).toBe('0 uur')

    expect(
      formatTimeDurationToDisplay(0, 'second', {smallestUnit: 'hours'}),
    ).toBe('0 uur')
  })

  it("should return '0 minuten' if input is 0 and smallest unit is 'minutes'", () => {
    expect(
      formatTimeDurationToDisplay(0, 'hour', {smallestUnit: 'minutes'}),
    ).toBe('0 minuten')

    expect(
      formatTimeDurationToDisplay(0, 'minute', {smallestUnit: 'minutes'}),
    ).toBe('0 minuten')

    expect(
      formatTimeDurationToDisplay(0, 'second', {smallestUnit: 'minutes'}),
    ).toBe('0 minuten')
  })

  it("should return '0 seconden' if input is 0 and smallest unit is 'seconds'", () => {
    expect(
      formatTimeDurationToDisplay(0, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('0 seconden')

    expect(
      formatTimeDurationToDisplay(0, 'minute', {smallestUnit: 'seconds'}),
    ).toBe('0 seconden')

    expect(
      formatTimeDurationToDisplay(0, 'second', {smallestUnit: 'seconds'}),
    ).toBe('0 seconden')
  })

  it("should omit hours and only return minutes if input does not exceed more than one hour and smallest unit is 'minutes'(default)", () => {
    expect(
      formatTimeDurationToDisplay(0.5, 'hour', {smallestUnit: 'minutes'}),
    ).toBe('30 minuten')
    expect(
      formatTimeDurationToDisplay(0, 'hour', {smallestUnit: 'minutes'}),
    ).toBe('0 minuten')
  })

  it("should omit hours and only return minutes and seconds if input does not exceed more than one hour and smallest unit is 'seconds'", () => {
    expect(
      formatTimeDurationToDisplay(0.5, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('30 minuten')
    expect(
      formatTimeDurationToDisplay(0.51, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('30 minuten en 36 seconden')
    expect(
      formatTimeDurationToDisplay(0, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('0 seconden')
  })

  it("should omit hours and minutes and only return seconds if input does not exceed more than one minute and smallest unit is 'seconds'", () => {
    expect(
      formatTimeDurationToDisplay(0.0166, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('59 seconden')
  })

  it('should return 0 with appropriate unit for invalid inputs', () => {
    expect(formatTimeDurationToDisplay(null as unknown as number, 'hour')).toBe(
      '0 minuten',
    )

    expect(formatTimeDurationToDisplay(Infinity, 'hour')).toBe('0 minuten')

    expect(
      formatTimeDurationToDisplay(undefined as unknown as number, 'hour', {
        smallestUnit: 'seconds',
      }),
    ).toBe('0 seconden')

    expect(
      formatTimeDurationToDisplay('test' as unknown as number, 'hour', {
        smallestUnit: 'hours',
      }),
    ).toBe('0 uur')

    expect(
      formatTimeDurationToDisplay({} as unknown as number, 'hour', {
        smallestUnit: 'hours',
      }),
    ).toBe('0 uur')
  })

  it('should format time correctly based on provided unit and smallest unit', () => {
    expect(formatTimeDurationToDisplay(1, 'hour')).toBe('1 uur')
    expect(
      formatTimeDurationToDisplay(1, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('1 uur')
    expect(
      formatTimeDurationToDisplay(1.01, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('1 uur en 36 seconden')
    expect(
      formatTimeDurationToDisplay(1.11, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('1 uur, 6 minuten en 36 seconden')
    expect(
      formatTimeDurationToDisplay(0.11, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('6 minuten en 36 seconden')
    expect(
      formatTimeDurationToDisplay(0.01, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('36 seconden')
    expect(formatTimeDurationToDisplay(1, 'minute')).toBe('1 minuut')
    expect(
      formatTimeDurationToDisplay(1, 'second', {smallestUnit: 'seconds'}),
    ).toBe('1 seconde')
    expect(
      formatTimeDurationToDisplay(1, 'second', {smallestUnit: 'minutes'}),
    ).toBe('0 minuten')

    expect(
      formatTimeDurationToDisplay(1, 'second', {smallestUnit: 'hours'}),
    ).toBe('0 uur')
  })

  it('should combine time units correctly', () => {
    expect(
      formatTimeDurationToDisplay(1.234, 'hour', {smallestUnit: 'hours'}),
    ).toBe('1 uur')
    expect(
      formatTimeDurationToDisplay(1.234, 'hour', {smallestUnit: 'minutes'}),
    ).toBe('1 uur en 14 minuten')
    expect(
      formatTimeDurationToDisplay(1.2338, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('1 uur, 14 minuten en 1 seconde')

    expect(
      formatTimeDurationToDisplay(1.999, 'hour', {smallestUnit: 'hours'}),
    ).toBe('1 uur')
    expect(
      formatTimeDurationToDisplay(1.999, 'hour', {smallestUnit: 'minutes'}),
    ).toBe('1 uur en 59 minuten')
    expect(
      formatTimeDurationToDisplay(1.999999, 'hour', {smallestUnit: 'seconds'}),
    ).toBe('1 uur, 59 minuten en 59 seconden')
  })

  it('should format time string correctly', () => {
    expect(formatTimeDurationToDisplay(1.234, 'hour')).toBe(
      '1 uur en 14 minuten',
    )
    expect(formatTimeDurationToDisplay(1.234, 'hour', {format: 'short'})).toBe(
      '1 uur en 14 min',
    )
    expect(
      formatTimeDurationToDisplay(1.234, 'hour', {format: 'veryShort'}),
    ).toBe('1 u 14 min')

    expect(
      formatTimeDurationToDisplay(1.999999, 'hour', {
        smallestUnit: 'seconds',
        format: 'short',
      }),
    ).toBe('1 uur, 59 min en 59 sec')

    expect(
      formatTimeDurationToDisplay(1.999999, 'hour', {
        smallestUnit: 'seconds',
        format: 'veryShort',
      }),
    ).toBe('1 u 59 min 59 sec')
  })

  it('should return negative time strings', () => {
    expect(formatTimeDurationToDisplay(-1.234, 'hour')).toBe(
      '- 1 uur en 14 minuten',
    )
  })
})
