import {compareSortableItemsByStartDateTime} from '@/utils/sort/compareSortableItemsByStartDateTime'

export const sortByDate = <
  T extends {dummy?: boolean; start_date_time: string},
>(
  sortableItems: Array<T> | undefined,
  sortAscending: boolean,
): Array<T> =>
  [...(sortableItems ?? [])].sort((a, b) => {
    if (a.dummy || b.dummy) return 0
    if (sortAscending) return compareSortableItemsByStartDateTime(a, b)

    // eslint-disable-next-line sonarjs/arguments-order
    return compareSortableItemsByStartDateTime(b, a)
  })
