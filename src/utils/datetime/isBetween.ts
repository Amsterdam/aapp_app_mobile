import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'

export const isBetween = (
  date: string | Dayjs,
  start: string | Dayjs,
  end: string | Dayjs,
): boolean => {
  const testDatetime = dayjs(date)
  const startDatetime = dayjs(start)
  const endDatetime = dayjs(end)

  return (
    testDatetime.isAfter(startDatetime) && testDatetime.isBefore(endDatetime)
  )
}
