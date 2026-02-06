import {getCalendarDays} from '@/modules/waste-guide/components/calendar/utils/getCalendarDays'
import {dayjs} from '@/utils/datetime/dayjs'

type WeekWithMonth = {
  days: ReturnType<typeof dayjs>[]
  isFirstOfMonth: boolean
  isLastOfMonth: boolean
  monthName?: string
}

export const getCalendarWeeks = () => {
  const days = getCalendarDays()
  // Split days into weeks and annotate with isFirstOfMonth and monthName
  const weeks: WeekWithMonth[] = []
  let prevMonth: string | null = null

  for (let i = 0; i < days.length; i += 7) {
    const weekDays = days.slice(i, i + 7)
    const monthsInWeek = Array.from(
      new Set(weekDays.map(day => day.format('MMMM'))),
    )
    let currentMonth = monthsInWeek[0]

    if (monthsInWeek.length > 1 && monthsInWeek[1] !== prevMonth) {
      currentMonth = monthsInWeek[1]
    }

    const isFirstOfMonth = currentMonth !== prevMonth

    // isLastOfMonth: true if the next week contains any day that is the first of a month
    const nextWeek = days.slice(i + 7, i + 14)
    const isLastOfMonth = nextWeek.some(day => day.date() === 1)

    const week = {
      days: weekDays,
      isFirstOfMonth,
      isLastOfMonth,
      monthName: currentMonth,
    }

    // To render transitional weeks (from previous of month into new month) we need to duplicate those weeks and provide their appropriate transitional status.
    // This is to show days of month 1 inside the grid of month 1, and days of month 2 inside the grid row of month 2. In the data, this requires duplicate days.
    if (weekDays.some(day => day.date() === 1)) {
      weeks.push({
        ...week,
        isFirstOfMonth: false,
        isLastOfMonth: true,
      })
      weeks.push({
        ...week,
        isFirstOfMonth: true,
        isLastOfMonth: false,
      })
    } else {
      weeks.push(week)
    }

    prevMonth = currentMonth
  }

  return weeks
}
