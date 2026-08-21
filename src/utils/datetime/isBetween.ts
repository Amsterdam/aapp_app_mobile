import type {Dayjs} from '@/utils/datetime/dayjs'
import {processDateInput} from '@/utils/datetime/isDayjsOrDate'

export const isBetween = (
  date: string | Dayjs,
  start: string | Dayjs,
  end: string | Dayjs,
): boolean => {
  const testDatetime = processDateInput(date)
  const startDatetime = processDateInput(start)
  const endDatetime = processDateInput(end)

  return (
    testDatetime.isAfter(startDatetime) && testDatetime.isBefore(endDatetime)
  )
}
