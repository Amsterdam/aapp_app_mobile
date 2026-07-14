import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {
  PrideEndpointName,
  type PrideEventsResponse,
} from '@/modules/pride/types'
import {baseApi} from '@/services/baseApi'

export const prideApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [PrideEndpointName.events]: builder.query<PrideEventsResponse, void>({
      query: () => ({
        method: 'GET',
        slug: ModuleSlug.service,
        url: '/pride/events',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {usePrideEventsQuery} = prideApi
