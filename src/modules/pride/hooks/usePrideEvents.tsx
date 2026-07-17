import {useCallback, useMemo} from 'react'
import type {PrideEvent} from '@/modules/pride/types'
import type {Service, ServicePointFeature} from '@/modules/service/types'
import {getAddressLine1} from '@/modules/address/utils/addDerivedAddressFields'
// import {PRIDE_EVENT_ICON_CONFIG} from '@/modules/pride/constants'
import {usePrideEventsQuery} from '@/modules/pride/service'
import {getEventsSeparatedByLocation} from '@/modules/pride/utils/getEventsSeparatedByLocation'

export const usePrideEvents = (serviceId?: Service['id']) => {
  const {data: events, ...rest} = usePrideEventsQuery({serviceId})

  const getEvent = useCallback(
    (eventId: PrideEvent['id']) => events?.find(event => event.id === eventId),
    [events],
  )

  const eventsByLocation = useMemo(
    () => getEventsSeparatedByLocation(events),
    [events],
  )

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
