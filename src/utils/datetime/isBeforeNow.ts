import {Dayjs} from 'dayjs'
import {dayjs} from '@/utils/datetime/dayjs'

export const isBeforeNow = (date: string | Dayjs | null) => {
  if (!date) return false

  const now = dayjs()
  const dateTime = typeof date === 'string' ? dayjs(date) : date

  if (!dateTime.isValid()) {
    return false
  }

  return dateTime.isBefore(now)
}
