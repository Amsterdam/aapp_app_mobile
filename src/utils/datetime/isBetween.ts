import {isDayjs} from 'dayjs'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'

export const isBetween = (
  date: string | Dayjs,
  start: string | Dayjs,
  end: string | Dayjs,
): boolean => {
  const testDatetime = isDayjs(date) ? date : dayjs(date)
  const startDatetime = isDayjs(start) ? start : dayjs(start)
  const endDatetime = isDayjs(end) ? end : dayjs(end)

  return (
    testDatetime.isAfter(startDatetime) && testDatetime.isBefore(endDatetime)
  )
}
