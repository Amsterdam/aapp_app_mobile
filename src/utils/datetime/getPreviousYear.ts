import type {ConfigType} from 'dayjs'
import {processDateInput} from '@/utils/datetime/isDayjsOrDate'

export const getPreviousYear = (date: ConfigType) =>
  processDateInput(date).subtract(1, 'year').add(1, 'day')
