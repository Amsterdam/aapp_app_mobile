import type {PrideEvent, PrideEventsResponse} from '@/modules/pride/types'
import type {Coordinates} from '@/types/location'

export const getEventsSeparatedByLocation = (events?: PrideEventsResponse) =>
  (events ?? []).reduce<
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
