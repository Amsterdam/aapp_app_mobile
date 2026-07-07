import type {PrideEvent} from '@/modules/pride/types'
import {dayjs, type Dayjs} from '@/utils/datetime/dayjs'
import {isBetween} from '@/utils/datetime/isBetween'

export const eventIsOnDay = (day: Dayjs, event: PrideEvent) =>
  isBetween(
    day,
    dayjs(event.date_start).startOf('day'),
    dayjs(event.date_end ?? event.date_start).endOf('day'),
  )
