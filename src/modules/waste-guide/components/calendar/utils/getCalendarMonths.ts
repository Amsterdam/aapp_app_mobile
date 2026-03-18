import type {Dayjs} from '@/utils/datetime/dayjs'
import {getCalendarDays} from '@/modules/waste-guide/components/calendar/utils/getCalendarDays'

type FormattedWeeks = Record<string, Record<number, Array<Dayjs | null>>>

/**
 * @param totalDays The number of days to include in the calendar
 * @returns Object keyed by month name (e.g. "maart"), containing weeks (number), containing an array of 7 days (Mon–Sun) with entries of type `Dayjs | null`
 * @example
 * ```ts
 * import dayjs from '@/utils/datetime/dayjs'
 *
 * const months = getCalendarMonths(7)
 *
 * const exampleReturnedObject = {
 *   maart: {
 *     12: [
 *       null,
 *       dayjs('2026-03-17'),   // Tue
 *       dayjs('2026-03-18'),   // Wed
 *       dayjs('2026-03-19'),   // Thu
 *       dayjs('2026-03-20'),   // Fri
 *       dayjs('2026-03-21'),   // Sat
 *       dayjs('2026-03-22'),   // Sun
 *     ],
 *     13: [
 *       dayjs('2026-03-23'),   // Mon
 *       null,
 *       null,
 *       null,
 *       null,
 *       null,
 *       null,
 *     ],
 *   },
 * }
 * ```
 */
export const getCalendarMonths = (totalDays: number = 1) => {
  const days = getCalendarDays(totalDays)

  return days.reduce((acc: FormattedWeeks, day: Dayjs) => {
    const month = day.clone().format('MMMM')
    const week = day.clone().week()
    const dayIndex = day.clone().subtract(1, 'day').day()

    const nullArray = Array.from({length: 7}).fill(null) as Array<null>
    const existingWeek: Array<Dayjs | null> = acc[month]?.[week] || nullArray

    existingWeek[dayIndex] = day

    return {
      ...acc,
      [month]: {...acc[month], [week]: existingWeek},
    }
  }, {})
}
