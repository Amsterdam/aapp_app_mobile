import {useCallback} from 'react'
import type {PrideEvent} from '@/modules/pride/types'
import type {Service} from '@/modules/service/types'
import {usePrideEventsQuery} from '@/modules/pride/service'

export const usePrideEvents = (serviceId?: Service['id']) => {
  const {data: events, ...rest} = usePrideEventsQuery({serviceId})

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
