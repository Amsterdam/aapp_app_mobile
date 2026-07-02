import {dayjs} from '@/utils/datetime/dayjs'

export const sortByDateDescending = <
  T extends Record<K, string | number>,
  K extends keyof T,
>(
  array: T[],
  key: K,
) =>
  array.slice().sort((a, b) => {
    const aDate = dayjs(a[key])
    const bDate = dayjs(b[key])

    if (aDate.isSame(bDate)) {
      return 0
    }

    return aDate.isBefore(bDate) ? 1 : -1
  })
