import {useCallback} from 'react'
import type {PrideEvent} from '@/modules/pride/types'
import {usePrideEventsQuery} from '@/modules/pride/service'
import {useServiceOverviewQuery} from '@/modules/service/service'
import {ServiceModuleSource} from '@/modules/service/types'

export const usePrideEvents = () => {
  const {data: serviceMaps} = useServiceOverviewQuery(ServiceModuleSource.pride)

  const {data: events, ...rest} = usePrideEventsQuery(
    {
      serviceId: serviceMaps?.[0].id,
    },
    {skip: !serviceMaps?.length},
  )

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
