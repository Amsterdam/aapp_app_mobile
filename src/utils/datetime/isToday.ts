import {Dayjs, dayjs} from '@/utils/datetime/dayjs'
import {processDateInput} from '@/utils/datetime/isDayjsOrDate'

export const isToday = (date: string | number | Dayjs): boolean =>
  processDateInput(date).isSame(dayjs(), 'day')
