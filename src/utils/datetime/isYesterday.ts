import {dayjs, Dayjs} from '@/utils/datetime/dayjs'

/**
 * Whether the given date is yesterday,
 * calculated from today or a given base date.
 */
export const isYesterday = (date: string | Dayjs, baseDate: Dayjs = dayjs()) =>
  dayjs(date).startOf('day').diff(baseDate.startOf('day'), 'day') === -1
