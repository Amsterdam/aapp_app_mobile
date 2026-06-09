import {dayjs} from '@/utils/datetime/dayjs'

export const sortByDateDescending = <
  T extends Record<K, string | number>,
  K extends keyof T,
>(
  array: T[],
  key: K,
) => array.slice().sort((a, b) => (dayjs(a[key]).isBefore(b[key]) ? 1 : -1))
