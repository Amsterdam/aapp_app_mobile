import {useCallback} from 'react'
import type {PrideEvent} from '@/modules/pride/types'
import {usePrideEventsQuery} from '@/modules/pride/service'

export const usePrideEvents = () => {
  const {data: events, ...rest} = usePrideEventsQuery()

  const getEvent = useCallback(
    (eventId: PrideEvent['id']) => events?.find(event => event.id === eventId),
    [events],
  )

  return {
    events,
    getEvent,
    ...rest,
  }
}
