import type {VisitingHour, ExceptionDate} from '@/types/openingTimes'
import {dayjs} from '@/utils/datetime/dayjs'
import {getNextOpening} from '@/utils/openingTimes/getNextOpening'

describe('getNextOpening', () => {
  const baseDate = '2025-09-05' // Friday
  const getNow = (date: string, hour: number, minute: number = 0) =>
    dayjs(
      `${date}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`,
    )

  const visitingHours: VisitingHour[] = [
    {
      dayOfWeek: 5,
      opening: {hours: 9, minutes: 0},
      closing: {hours: 17, minutes: 0},
    }, // Friday
    {
      dayOfWeek: 1,
      opening: {hours: 8, minutes: 30},
      closing: {hours: 17, minutes: 0},
    }, // Monday
  ]

  it('returns next opening today if later today', () => {
    const now = getNow(baseDate, 8)
    const result = getNextOpening(visitingHours, [], now)

    expect(result).toEqual({dayLabel: 'vandaag', timeLabel: '09.00'})
  })

  it('returns next opening on Monday if today is Friday after closing', () => {
    const now = getNow(baseDate, 18)
    const result = getNextOpening(visitingHours, [], now)

    expect(result).toEqual({dayLabel: 'maandag', timeLabel: '08.30'})
  })

  it('skips weekends and finds next Monday', () => {
    const now = getNow('2025-09-06', 10) // Saturday
    const result = getNextOpening(visitingHours, [], now)

    expect(result).toEqual({dayLabel: 'maandag', timeLabel: '08.30'})
  })

  it('returns next exception opening if it exists before regular', () => {
    const now = getNow(baseDate, 18)
    const exceptions: ExceptionDate[] = [
      {
        date: '2025-09-08',
        description: null,
        opening: {hours: 10, minutes: 0},
        closing: {hours: 12, minutes: 0},
      }, // Monday
    ]
    const result = getNextOpening(visitingHours, exceptions, now)

    expect(result).toEqual({dayLabel: 'maandag', timeLabel: '10.00'})
  })

  it('skips closed-all-day exceptions', () => {
    const now = getNow(baseDate, 18)
    const exceptions: ExceptionDate[] = [
      {date: '2025-09-08', description: null}, // Monday closed all day
    ]
    const result = getNextOpening(visitingHours, exceptions, now)

    // Next available opening is Friday 2025-09-12 (diff > 6)
    expect(result).toEqual({dayLabel: '12 september', timeLabel: '09.00'})
  })

  it('returns null if no opening in next 8 days', () => {
    const now = getNow(baseDate, 18)
    const result = getNextOpening([], [], now)

    expect(result).toBeNull()
  })
})
