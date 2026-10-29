import dayjs, {Dayjs} from 'dayjs'
import type {VisitingHour, ExceptionDate} from '@/types/openingTimes'
import {getVisitingHoursTodayStatus} from '@/utils/openingTimes/getVisitingHoursTodayStatus'

describe('getVisitingHoursTodayStatus', () => {
  const baseDate = '2025-09-05' // Friday
  const getNow = (date: string, hour: number, minute: number = 0): Dayjs =>
    dayjs(
      `${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`,
    )

  const visitingHours: VisitingHour[] = [
    {
      dayOfWeek: 5, // Friday
      opening: {hours: 9, minutes: 0},
      closing: {hours: 17, minutes: 0},
    },
  ]

  it('returns open-regular when within regular hours and no exception', () => {
    const now = getNow(baseDate, 10)
    const result = getVisitingHoursTodayStatus(visitingHours, [], now)

    expect(result.status).toBe('open-regular')
  })

  it('returns closed when outside regular hours and no exception', () => {
    const now = getNow(baseDate, 18)
    const result = getVisitingHoursTodayStatus(visitingHours, [], now)

    expect(result.status).toBe('closed')
  })

  it('returns open-exception when within exception hours', () => {
    const now = getNow(baseDate, 12)
    const exceptions: ExceptionDate[] = [
      {
        date: baseDate,
        description: null,
        opening: {hours: 11, minutes: 0},
        closing: {hours: 15, minutes: 0},
      },
    ]
    const result = getVisitingHoursTodayStatus(visitingHours, exceptions, now)

    expect(result.status).toBe('open-exception')
    expect(result.closingTime).toBe('15.00')
  })

  it('returns open-exception when outside regular hours but within exception hours', () => {
    const now = getNow(baseDate, 18)
    const exceptions: ExceptionDate[] = [
      {
        date: baseDate,
        description: null,
        opening: {hours: 9, minutes: 0},
        closing: {hours: 19, minutes: 0},
      },
    ]
    const result = getVisitingHoursTodayStatus(visitingHours, exceptions, now)

    expect(result.status).toBe('open-exception')
    expect(result.closingTime).toBe('19.00')
  })

  it('returns closed when exception is closed all day (no opening/closing)', () => {
    const now = getNow(baseDate, 12)
    const exceptions: ExceptionDate[] = [
      {
        date: baseDate,
        description: null,
        // no opening or closing fields
      },
    ]
    const result = getVisitingHoursTodayStatus(visitingHours, exceptions, now)

    expect(result.status).toBe('closed')
  })

  it('returns closed when exception exists but now is outside exception hours', () => {
    const now = getNow(baseDate, 16)
    const exceptions: ExceptionDate[] = [
      {
        date: baseDate,
        description: null,
        opening: {hours: 11, minutes: 0},
        closing: {hours: 15, minutes: 0},
      },
    ]
    const result = getVisitingHoursTodayStatus(visitingHours, exceptions, now)

    expect(result.status).toBe('closed')
  })

  it('returns closed when no regular hours for today', () => {
    const now = getNow(baseDate, 10)
    const result = getVisitingHoursTodayStatus([], [], now)

    expect(result.status).toBe('closed')
  })
})
