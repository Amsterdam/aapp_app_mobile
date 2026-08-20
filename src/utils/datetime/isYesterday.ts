import {dayjs, Dayjs} from '@/utils/datetime/dayjs'
import {processDateInput} from '@/utils/datetime/isDayjsOrDate'

/**
 * Whether the given date is yesterday,
 * calculated from today or a given base date.
 */
export const isYesterday = (date: string | Dayjs, baseDate: Dayjs = dayjs()) =>
  processDateInput(date).startOf('day').diff(baseDate.startOf('day'), 'day') ===
  -1
