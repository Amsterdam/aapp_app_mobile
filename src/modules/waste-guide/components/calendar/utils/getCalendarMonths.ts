import type {Dayjs} from '@/utils/datetime/dayjs'
import {getCalendarDays} from '@/modules/waste-guide/components/calendar/utils/getCalendarDays'

type FormattedWeeks = Record<string, Record<number, Array<Dayjs | null>>>

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
