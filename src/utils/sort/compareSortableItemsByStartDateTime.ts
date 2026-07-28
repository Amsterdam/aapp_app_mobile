import {dayjs} from '@/utils/datetime/dayjs'

/**
 * Compares two sortable items by their start date and time.
 * @param a The first sortable item to compare
 * @param b The second sortable item to compare
 * @returns A negative number if a is before b, a positive number if a is after b, or 0 if they are equal
 */
export const compareSortableItemsByStartDateTime = <
  T extends {start_date_time: string},
>(
  a: T,
  b: T,
) =>
  a.start_date_time === b.start_date_time
    ? 0
    : dayjs(a.start_date_time).isBefore(dayjs(b.start_date_time))
      ? -1
      : 1
