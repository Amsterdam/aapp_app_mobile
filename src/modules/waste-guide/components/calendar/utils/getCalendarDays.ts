import {dayjs} from '@/utils/datetime/dayjs'

export const getCalendarDays = (totalDays: number = 1) => {
  const today = dayjs()

  return Array.from({
    length: Math.max(1, totalDays),
  }).map((_, i) => today.clone().add(i, 'day'))
}
