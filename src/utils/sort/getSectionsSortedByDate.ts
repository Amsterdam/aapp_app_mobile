import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'
import {compareSortableItemsByStartDateTime} from '@/utils/sort/compareSortableItemsByStartDateTime'

export const dummyTitle = 'dummy'

export type Section<T> = {
  data: Array<T>
  title: string
}

/**
 * Groups an array of sortable items into sections based on their start date and time.
 * @param sortableItems The array of sortable items to group
 * @param sortAscending Whether to sort the items in ascending order (true) or descending order (false)
 * @returns An array of sections, each containing a title and an array of sortable items
 */
export const getSectionsSortedByDate = <
  T extends {dummy?: boolean; start_date_time: string},
>(
  sortableItems: Array<T> | undefined,
  sortAscending: boolean,
): Section<T>[] =>
  [...(sortableItems ?? [])]
    .sort((a, b) =>
      a.dummy || b.dummy
        ? 0
        : sortAscending
          ? compareSortableItemsByStartDateTime(a, b)
          : // eslint-disable-next-line sonarjs/arguments-order
            compareSortableItemsByStartDateTime(b, a),
    )
    .reduce<Section<T>[]>((result, session) => {
      const date = session.dummy
        ? dummyTitle
        : formatDateToDisplay(session.start_date_time, false)
      const section = result.find(s => s.title === date)

      if (section) {
        section.data.push(session)
      } else {
        result.push({title: date, data: [session]})
      }

      return result
    }, [])
