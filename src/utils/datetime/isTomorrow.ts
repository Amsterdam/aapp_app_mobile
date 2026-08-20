import {dayjs, Dayjs} from '@/utils/datetime/dayjs'
import {processDateInput} from '@/utils/datetime/isDayjsOrDate'

/**
 * Whether the given date is tomorrow,
 * calculated from today or a given base date.
 */
export const isTomorrow = (date: string | Dayjs, baseDate: Dayjs = dayjs()) =>
  processDateInput(date).startOf('day').diff(baseDate.startOf('day'), 'day') ===
  1
