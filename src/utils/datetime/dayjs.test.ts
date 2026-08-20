import {dayjs, dayjsTimeZoneAware} from '@/utils/datetime/dayjs'

describe('dayjsTimeZoneAware', () => {
  it.each([
    '-12:00',
    '-11:00',
    '-10:00',
    '-09:00',
    '-08:00',
    '-07:00',
    '-06:00',
    '-05:00',
    '-04:00',
    '-03:00',
    '-02:00',
    '-01:00',
    '+00:00',
    '+01:00',
    '+02:00',
    '+03:00',
    '+04:00',
    '+05:00',
    '+06:00',
    '+07:00',
    '+08:00',
    '+09:00',
    '+10:00',
    '+11:00',
    '+12:00',
    '+13:00',
    '+14:00',
  ])('preserves the incoming time and offset for %s', timezoneOffset => {
    const zonedTime = `2026-08-19T12:10:50${timezoneOffset}`

    expect(dayjsTimeZoneAware(zonedTime).format()).toBe(
      `2026-08-19T12:10:50${timezoneOffset === '+00:00' ? 'Z' : timezoneOffset}`,
    )
    const offset =
      timezoneOffset === 'Z' ? '+00:00' : timezoneOffset.slice(1, 3)
    const isNegative = timezoneOffset[0] === '-'
    const multiplier = Number.parseInt(offset, 10)

    const offsetMultiplier = isNegative ? -multiplier : multiplier

    expect(dayjsTimeZoneAware(zonedTime).utcOffset()).toBe(
      offsetMultiplier * 60,
    )
  })

  it('preserves the incoming local time and offset from an ISO timestamp', () => {
    const serverTime = '2026-08-19T12:00:00+02:00'
    const otherTimeZoneTime = '2026-08-19T13:00:00+03:00'

    expect(dayjsTimeZoneAware(serverTime).format()).toBe(serverTime)
    expect(dayjsTimeZoneAware(otherTimeZoneTime).format()).toBe(
      otherTimeZoneTime,
    )

    expect(dayjsTimeZoneAware(serverTime).utc()).toEqual(
      dayjsTimeZoneAware(otherTimeZoneTime).utc(),
    )

    expect(dayjsTimeZoneAware(serverTime).utcOffset()).toBe(2 * 60)
    expect(dayjsTimeZoneAware(otherTimeZoneTime).utcOffset()).toBe(3 * 60)
    expect(dayjsTimeZoneAware('2026-08-19T12:00:00+00:00').utcOffset()).toBe(
      0 * 60,
    )
    expect(dayjsTimeZoneAware('2026-08-19T12:00:00+01:00').utcOffset()).toBe(
      1 * 60,
    )
    expect(dayjsTimeZoneAware('2026-08-19T12:00:00+10:00').utcOffset()).toBe(
      10 * 60,
    )
  })

  it('keeps UTC timestamps in UTC mode', () => {
    const utcTime = '2026-08-19T12:10:50.402Z'

    expect(dayjsTimeZoneAware(utcTime).format()).toBe('2026-08-19T12:10:50Z')
    expect(dayjsTimeZoneAware(utcTime).utcOffset()).toBe(0)
  })

  it('uses the configured default timezone for dayjs.tz without an explicit zone', () => {
    const time = '2026-08-19 14:10:50'

    expect(dayjs.tz(time).format()).toBe('2026-08-19T14:10:50+02:00')
    expect(dayjs.tz(time).utcOffset()).toBe(120)
  })
})
