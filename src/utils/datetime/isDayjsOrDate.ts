import {isDayjs, type ConfigType} from 'dayjs'
import {dayjs} from '@/utils/datetime/dayjs'

/**
 * Passes through the date if it is a Dayjs object, otherwise converts it to Dayjs.
 */
export const processDateInput = (date: ConfigType) =>
  isDayjs(date) ? date : dayjs(date)
