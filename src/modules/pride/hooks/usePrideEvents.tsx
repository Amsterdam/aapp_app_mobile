import {useCallback, useMemo} from 'react'
import type {MarkerProperties} from '@/components/features/map/types'
import type {PrideEvent} from '@/modules/pride/types'
import type {Coordinates} from '@/types/location'
import type {Supercluster} from 'react-native-clusterer'
import {PrideEventMarker} from '@/modules/pride/components/PrideEventMarker'
import {usePrideEventsQuery} from '@/modules/pride/service'

export const usePrideEvents = () => {
  const {data: events, ...rest} = usePrideEventsQuery()

  const getEvent = useCallback(
    (eventId: PrideEvent['id']) => events?.find(event => event.id === eventId),
    [events],
  )

  const eventsByLocation = useMemo(() => {
    if (!events) return

    return events.reduce<
      Record<
        string,
        {
          coordinates: Coordinates
          events: PrideEvent[]
        }
      >
    >((locations, event) => {
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
    }, {})
  }, [events])

  const extraPoints = useMemo(() => {
    if (!eventsByLocation) {
      return []
    }

    return Object.values(eventsByLocation).map<
      Supercluster.PointFeature<MarkerProperties>
    >((location, index) => ({
      type: 'Feature' as const,
      id: index,
      geometry: {
        type: 'Point' as const,
        coordinates: [location.coordinates.lon, location.coordinates.lat],
      },
      properties: {
        id: `feature-locations-properties-${index}`,
        Icon: <PrideEventMarker />,
        aapp_subtitle: 'Evenementen',
      },
    }))
  }, [eventsByLocation])

  const getEventsOnLocation = useCallback(
    (locationIndex: number) => {
      if (!eventsByLocation) {
        return []
      }

      return Object.values(eventsByLocation)[locationIndex].events
    },
    [eventsByLocation],
  )

  return {
    events,
    getEvent,
    getEventsOnLocation,
    eventsByLocation,
    extraPoints,
    ...rest,
  }
}
