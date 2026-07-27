import type {LiveblogItem} from '@/modules/news/types'
import {dayjs} from '@/utils/datetime/dayjs'

export const getLiveblogLastEntriesPerDay = (items: LiveblogItem[] = []) =>
  new Set(
    Object.values(
      items.reduce<Record<string, LiveblogItem>>((days, item) => {
        const itemDate = dayjs(item.creation_datetime)
        const key = itemDate.format('DD-MM-YYYY')

        days[key] =
          days[key] && dayjs(days[key].creation_datetime).isAfter(itemDate)
            ? days[key]
            : item

        return days
      }, {}),
    ),
  )
