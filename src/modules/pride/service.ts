import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {
  EVENT_MAP_LAYER,
  EVENT_PROPERTIES_TO_INCLUDE,
  EVENT_ICONS_TO_INCLUDE,
  EVENTS_ICON_LABEL,
  EVENTS_ID_PREFIX,
} from '@/modules/pride/constants'
import {
  PrideEndpointName,
  type PrideEventsResponse,
} from '@/modules/pride/types'
import {getEventFeatures} from '@/modules/pride/utils/getEventFeatures'
import {getEventsSeparatedByLocation} from '@/modules/pride/utils/getEventsSeparatedByLocation'
import {serviceApi} from '@/modules/service/service'
import {
  ServiceEndpointName,
  type Service,
  type ServiceMapResponse,
} from '@/modules/service/types'
import {devError} from '@/processes/development'
import {baseApi} from '@/services/baseApi'
import {hasEqualValues} from '@/utils/object'

export const prideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [PrideEndpointName.events]: builder.query<
      PrideEventsResponse,
      {serviceId?: Service['id']}
    >({
      query: () => ({
        method: 'GET',
        slug: ModuleSlug.service,
        url: '/pride/events',
      }),

      onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
        if (!arg.serviceId) {
          return
        }

        try {
          const {data} = await queryFulfilled

          // Without an existing cache, the events cannot be added to the query data
          await dispatch(
            serviceApi.endpoints[ServiceEndpointName.service].initiate(
              arg.serviceId,
              {
                subscribe: false,
              },
            ),
          ).unwrap()

          dispatch(
            serviceApi.util.updateQueryData(
              ServiceEndpointName.service,
              arg.serviceId,
              (draft: ServiceMapResponse) => {
                if (
                  !draft.layers.some(layer =>
                    hasEqualValues(layer, EVENT_MAP_LAYER),
                  )
                ) {
                  // Add extra map layer for events, in order to switch visibility
                  draft.layers.push(EVENT_MAP_LAYER)
                }

                if (
                  !draft.properties_to_include.some(property =>
                    hasEqualValues(property, EVENT_PROPERTIES_TO_INCLUDE),
                  )
                ) {
                  // Add extra properties for events to display in detail bottomsheet
                  draft.properties_to_include.push(EVENT_PROPERTIES_TO_INCLUDE)
                }

                if (
                  !Object.keys(draft.icons_to_include || {}).includes(
                    EVENTS_ICON_LABEL,
                  )
                ) {
                  // Add extra icon for events to display on map/list and layers
                  draft.icons_to_include = {
                    ...draft.icons_to_include,
                    ...EVENT_ICONS_TO_INCLUDE,
                  }
                }

                if ('type' in draft.data) {
                  // Add events separated by location to map points
                  const eventFeatures = getEventFeatures(
                    getEventsSeparatedByLocation(data),
                  )

                  draft.data.features = draft.data.features.filter(
                    feature => !String(feature.id).startsWith(EVENTS_ID_PREFIX),
                  )

                  draft.data.features.push(...eventFeatures)
                }
              },
            ),
          )
        } catch (error) {
          devError('Error fetching Pride events', error)
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const {usePrideEventsQuery} = prideApi
