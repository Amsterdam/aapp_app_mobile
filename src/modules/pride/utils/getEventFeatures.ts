import type {getEventsSeparatedByLocation} from '@/modules/pride/utils/getEventsSeparatedByLocation'
import type {ServicePointFeature} from '@/modules/service/types'
import {
  EVENTS_FILTER_KEY,
  EVENTS_FILTER_VALUE,
  EVENTS_ICON_LABEL,
  EVENTS_PROPERTY_KEY,
} from '@/modules/pride/constants'
import {formatMeta} from '@/modules/pride/utils/formatMeta'

export const getEventFeatures = (
  eventsSeparatedByLocation: ReturnType<typeof getEventsSeparatedByLocation>,
): ServicePointFeature[] =>
  Object.values(eventsSeparatedByLocation).map<ServicePointFeature>(
    (location, index) => ({
      type: 'Feature' as const,
      id: `event-location-${index}`,
      geometry: {
        type: 'Point' as const,
        coordinates: [location.coordinates.lon, location.coordinates.lat],
      },
      properties: {
        id: `feature-locations-properties-${index}`,
        aapp_title: 'Evenementen locatie ' + location.events[0].address.street,
        [EVENTS_FILTER_KEY]: EVENTS_FILTER_VALUE,
        aapp_icon_type: EVENTS_ICON_LABEL,
        [EVENTS_PROPERTY_KEY]: location.events.map(
          ({type: _type, ...event}) => ({
            key: event.title,
            value: formatMeta(event) ?? '',
          }),
        ),
      },
    }),
  )
