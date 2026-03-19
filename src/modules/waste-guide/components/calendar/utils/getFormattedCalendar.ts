import type {Dayjs} from '@/utils/datetime/dayjs'
import {getCalendarDays} from '@/modules/waste-guide/components/calendar/utils/getCalendarDays'

/**
 * Week in which week is defined by number (1 - 52/53) and contains an array of length 7 with Dayjs | null
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
 * Months in which month is defined by number (1 - 12) and contains week entries of type Week
 * @example
 * ```ts
 * const exampleMonth = {
 *    2: {                      // Feb
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
 * CalendarObject in which year is defined by number (YYYY) and contains month entries of type Month
 * @example
 * ```ts
 * const exampleCalendar = {
 *    2025: {
 *       12: {                  // December
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
 *       1: {                   // January
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
 * @returns Object keyed by year (e.g. "2026"), containing months (number), containing weeks (number), containing an array of 7 days (Mon–Sun) with entries of type `Dayjs | null`
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
    const week =
      day.clone().week() >= 52 && month === 0 ? 0 : day.clone().week() // Remnant of last week of previous year

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
