import {
  PrideEndpointName,
  type PrideEventsResponse,
} from '@/modules/pride/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

export const serviceApi = baseApi.injectEndpoints({
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

export const {usePrideEventsQuery} = serviceApi
