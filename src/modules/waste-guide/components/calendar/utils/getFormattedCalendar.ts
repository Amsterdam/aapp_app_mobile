import type {Dayjs} from '@/utils/datetime/dayjs'
import {getCalendarDays} from '@/modules/waste-guide/components/calendar/utils/getCalendarDays'

/**
 * Week in which the week number is defined by number (0 - 52/53) and contains an array of length 7 with `Dayjs | null`.
 * Week `0` is used for the "remnant" of the last ISO week of the previous year that spills into the start of January.
 * @example
 * ```ts
 * const exampleWeek = {
 *    12: [                     // Week 12
 *       null,
 *       dayjs('2026-03-17'),   // Tue
 *       dayjs('2026-03-18'),   // Wed
 *       dayjs('2026-03-19'),   // Thu
 *       dayjs('2026-03-20'),   // Fri
 *       dayjs('2026-03-21'),   // Sat
 *       dayjs('2026-03-22'),   // Sun
 *    ],
 *  }
 */
type Week = Record<string, Array<Dayjs | null>>

/**
 * Months in which the month is defined by number (0 - 11, Dayjs month index) and contains week entries of type `Week`.
 * Month `0` is January, `1` is February, ..., `11` is December.
 * @example
 * ```ts
 * const exampleMonth = {
 *    2: {                      // Mar
 *       12: {                  // Week 12
 *          [...],              // Array<Dayjs | null>
 *          [...],              // Array<Dayjs | null>
 *       },
 *       13: {
 *          [...],              // Array<Dayjs | null>
 *          [...],              // Array<Dayjs | null>
 *          ...
 *       },
 *       ...
 *    },
 *  }
 */
type Month = Record<string, Week>

/**
 * CalendarObject in which the year is defined by number (YYYY) and contains month entries of type `Month`.
 * Months are keyed by Dayjs month index (0 - 11), and weeks are keyed by week number (0 - 52/53),
 * where week `0` or `53` represent the spillover of the last/first ISO week of the previous/next year.
 * @example
 * ```ts
 * const exampleCalendar = {
 *    2025: {
 *       11: {                  // December
 *          51: {               // Week 51
 *              [...],          // Array<Dayjs | null>
 *              [...],          // Array<Dayjs | null>
 *          },
 *          52: {               // Week 52
 *             [...],           // Array<Dayjs | null>
 *             [...],           // Array<Dayjs | null>
 *             ...
 *          },
 *          ...
 *      },
 *    },
 *    2026: {
 *       0: {                   // January
 *         1: {                 // Week 1
 *           ...
 *         }
 *       }
 *    },
 *  }
 */
type CalendarObject = Record<string, Month>

/**
 * @param totalDays The number of days to include in the calendar
 * @returns Object keyed by year (e.g. `"2026"`), containing months (Dayjs month index `0`–`11`), containing weeks (week number `0`–`52/53`), containing an array of 7 days (Mon–Sun) with entries of type `Dayjs | null`.
 * Week `0` and `53` are used for the spillover in weeks in which the year changes.
 * @example
 * ```ts
 * const exampleReturnedObject = {
 *    2025: {
 *       11: {                  // December
 *          51: {               // Week 51
 *              [...],          // Array<Dayjs | null>
 *              [...],          // Array<Dayjs | null>
 *          },
 *          52: {               // Week 52
 *             [...],           // Array<Dayjs | null>
 *             [...],           // Array<Dayjs | null>
 *             ...
 *          },
 *          ...
 *      },
 *    },
 *    2026: {
 *       0: {                   // January
 *         1: {                 // Week 1
 *           ...
 *         }
 *       }
 *    },
 *  }
 * }
 * ```
 */
export const getFormattedCalendar = (totalDays: number = 1): CalendarObject => {
  const days = getCalendarDays(totalDays)

  return days.reduce((acc: CalendarObject, day: Dayjs) => {
    const year = day.clone().year()
    const month = day.clone().month()
    const rawWeek = day.clone().week()

    const spillOverStartOfYear = month === 0 && rawWeek >= 52
    const spillOverEndOfYear = month === 11 && rawWeek === 1

    const week = spillOverStartOfYear ? 0 : spillOverEndOfYear ? 53 : rawWeek

    const dayIndex = day.clone().subtract(1, 'day').day()

    if (!acc[year]) {
      acc[year] = {}
    }

    if (!acc[year][month]) {
      acc[year][month] = {}
    }

    if (!acc[year][month][week]) {
      acc[year][month][week] = Array.from({length: 7}).fill(
        null,
      ) as Array<Dayjs | null>
    }

    acc[year][month][week][dayIndex] = day

    return acc
  }, {})
}
