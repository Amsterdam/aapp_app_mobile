import type {LiveblogItem} from '@/modules/news/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const getLiveblogLastEntriesPerDay = (items: LiveblogItem[] = []) =>
  new Set(
    Object.values(
      items.reduce<Record<string, LiveblogItem>>((days, item) => {
        const itemDate = dayjs(item.creation_datetime)
        const key = itemDate.format('DD-MM-YYYY')

        const existingItem = days[key]

        const existingDate = existingItem
          ? dayjs(existingItem.creation_datetime)
          : null

        days[key] = existingDate?.isAfter(itemDate) ? existingItem : item

        return days
      }, {}),
    ),
  )
