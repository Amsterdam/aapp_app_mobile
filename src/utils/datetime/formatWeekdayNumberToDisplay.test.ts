import {formatWeekdayNumberToDisplay} from '@/utils/datetime/formatWeekdayNumberToDisplay'
import {weekDayMapping} from '@/utils/datetime/weekdayToNumber'

describe('formatWeekdayNumberToDisplay', () => {
  it('returns empty string for empty array', () => {
    expect(formatWeekdayNumberToDisplay([])).toBe('')
  })

  it('returns "Elke dag" for all days', () => {
    expect(
      formatWeekdayNumberToDisplay([
        weekDayMapping.zondag,
        weekDayMapping.maandag,
        weekDayMapping.dinsdag,
        weekDayMapping.woensdag,
        weekDayMapping.donderdag,
        weekDayMapping.vrijdag,
        weekDayMapping.zaterdag,
      ]),
    ).toBe('Elke dag')
  })

  it('returns correct string for single day', () => {
    expect(formatWeekdayNumberToDisplay([weekDayMapping.maandag])).toBe(
      'maandag',
    )
    expect(formatWeekdayNumberToDisplay([weekDayMapping.zondag])).toBe('zondag')
    expect(formatWeekdayNumberToDisplay([weekDayMapping.woensdag])).toBe(
      'woensdag',
    )
  })

  it('returns correct range for consecutive days', () => {
    expect(
      formatWeekdayNumberToDisplay([
        weekDayMapping.maandag,
        weekDayMapping.dinsdag,
        weekDayMapping.woensdag,
      ]),
    ).toBe('maandag tot en met woensdag')
    expect(
      formatWeekdayNumberToDisplay([
        weekDayMapping.donderdag,
        weekDayMapping.vrijdag,
        weekDayMapping.zaterdag,
      ]),
    ).toBe('donderdag tot en met zaterdag')
  })

  it('returns correct string for non-consecutive days', () => {
    expect(
      formatWeekdayNumberToDisplay([
        weekDayMapping.maandag,
        weekDayMapping.woensdag,
        weekDayMapping.vrijdag,
      ]),
    ).toBe('maandag, woensdag en vrijdag')
    expect(
      formatWeekdayNumberToDisplay([
        weekDayMapping.zondag,
        weekDayMapping.dinsdag,
        weekDayMapping.donderdag,
        weekDayMapping.zaterdag,
      ]),
    ).toBe('zondag, dinsdag, donderdag en zaterdag')
  })

  it('returns correct string for two days', () => {
    expect(
      formatWeekdayNumberToDisplay([
        weekDayMapping.dinsdag,
        weekDayMapping.donderdag,
      ]),
    ).toBe('dinsdag en donderdag')
  })

  it('sorts input before formatting', () => {
    expect(
      formatWeekdayNumberToDisplay([
        weekDayMapping.woensdag,
        weekDayMapping.maandag,
        weekDayMapping.dinsdag,
      ]),
    ).toBe('maandag tot en met woensdag')
    expect(
      formatWeekdayNumberToDisplay([
        weekDayMapping.zaterdag,
        weekDayMapping.zondag,
        weekDayMapping.dinsdag,
      ]),
    ).toBe('zondag, dinsdag en zaterdag')
  })

  it('formats weekend correctly', () => {
    expect(
      formatWeekdayNumberToDisplay([
        weekDayMapping.zondag,
        weekDayMapping.zaterdag,
      ]),
    ).toBe('zaterdag en zondag')
  })
})
