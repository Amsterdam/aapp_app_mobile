import {isDayjs} from 'dayjs'
import {Dayjs, dayjs} from '@/utils/datetime/dayjs'

export const isToday = (date: string | number | Dayjs): boolean =>
  (isDayjs(date) ? date : dayjs(date)).isSame(dayjs(), 'day')
