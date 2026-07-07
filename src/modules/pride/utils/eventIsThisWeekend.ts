import type {PrideEvent} from '@/modules/pride/types'
import {eventIsOnDay} from '@/modules/pride/utils/eventIsOnDay'
import {dayjs} from '@/utils/datetime/dayjs'

export const eventIsThisWeekend = (event: PrideEvent) => {
  const today = dayjs().set('hour', 5)
  const friday = today.add(5 - (today.day() || 7), 'day')
  const saturday = today.add(6 - (today.day() || 7), 'day')
  const sunday = today.add(7 - (today.day() || 7), 'day')

  return (
    eventIsOnDay(friday, event) ||
    eventIsOnDay(saturday, event) ||
    eventIsOnDay(sunday, event)
  )
}
