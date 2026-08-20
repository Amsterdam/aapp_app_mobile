import {ConfigType, isDayjs} from 'dayjs'
import {dayjs} from '@/utils/datetime/dayjs'

export const getPreviousYear = (date: ConfigType) =>
  (isDayjs(date) ? date : dayjs(date)).subtract(1, 'year').add(1, 'day')
