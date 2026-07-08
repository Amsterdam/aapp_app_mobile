import {useCallback, useMemo} from 'react'
import type {PrideEvent} from '@/modules/pride/types'
import type {Coordinates} from '@/types/location'
import {usePrideEventsQuery} from '@/modules/pride/service'

export const usePrideEvents = () => {
  const {data: events, ...rest} = usePrideEventsQuery()

  const getEvent = useCallback(
    (eventId: PrideEvent['id']) => events?.find(event => event.id === eventId),
    [events],
  )

  const eventsByLocation = useMemo(() => {
    if (!events) return

    return events.reduce(
      (
        locations: Record<
          string,
          {
            coordinates: Coordinates
            events: PrideEvent[]
          }
        >,
        event,
      ) => {
        if (!event.address.coordinates?.lat) {
          return locations
        }

        const coordsKey =
          event.address.coordinates.lat.toString() +
          event.address.coordinates.lon.toString()

        const locationIsAlreadyIncluded = locations[coordsKey]

        if (locationIsAlreadyIncluded) {
          return {
            ...locations,
            [coordsKey]: {
              coordinates: event.address.coordinates,
              events: [...locations[coordsKey].events, event],
            },
          }
        }

        locations[coordsKey] = {
          coordinates: event.address.coordinates,
          events: [event],
        }

        return locations
      },
      {},
    )
  }, [events])

  return {
    events,
    getEvent,
    eventsByLocation,
    ...rest,
  }
}
