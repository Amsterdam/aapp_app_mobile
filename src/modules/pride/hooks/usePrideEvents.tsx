import {useCallback, useMemo} from 'react'
import type {PrideEvent} from '@/modules/pride/types'
import type {ServicePointFeature} from '@/modules/service/types'
import type {Coordinates} from '@/types/location'
import {getAddressLine1} from '@/modules/address/utils/addDerivedAddressFields'
// import {PRIDE_EVENT_ICON_CONFIG} from '@/modules/pride/constants'
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

    return Object.values(eventsByLocation).map<ServicePointFeature>(
      (location, index) => ({
        type: 'Feature' as const,
        id: index,
        geometry: {
          type: 'Point' as const,
          coordinates: [location.coordinates.lon, location.coordinates.lat],
        },
        properties: {
          id: `feature-locations-properties-${index}`,
          aapp_title:
            'Evenementen op ' + getAddressLine1(location.events[0].address),
          // icon: {
          //   path: PRIDE_EVENT_ICON_CONFIG.path,
          //   path_color: PRIDE_EVENT_ICON_CONFIG.pathColor,
          //   circle_color: PRIDE_EVENT_ICON_CONFIG.circleColor,
          // },
          aapp_subtitle: 'Evenementen',
        },
      }),
    )
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
