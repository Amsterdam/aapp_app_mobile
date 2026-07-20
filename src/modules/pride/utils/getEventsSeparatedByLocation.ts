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
    const coordinates = event.address.coordinates

    if (coordinates?.lat == null || coordinates?.lon == null) {
      return locations
    }

    const coordsKey = `${coordinates.lat},${coordinates.lon}`

    const location = (locations[coordsKey] ??= {
      coordinates,
      events: [],
    })

    location.events.push(event)

    return locations
  }, {})
