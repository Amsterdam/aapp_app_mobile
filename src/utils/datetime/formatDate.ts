import type {Dayjs} from 'dayjs'
import {processDateInput} from '@/utils/datetime/isDayjsOrDate'

/**
 * Converts string to date
 */
export const formatDate = (
  date: string | number | Dayjs | null | undefined,
) => {
  if (!date) {
    return ''
  }

  return processDateInput(date).format('D MMMM YYYY')
}
