import {
  PollingStationsResponse,
  ElectionsEndpointName,
} from '@/modules/elections/types'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {baseApi} from '@/services/baseApi'

export const electionsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ElectionsEndpointName.pollingStations]: builder.query<
      PollingStationsResponse,
      void
    >({
      query: () => ({
        method: 'GET',
        slug: ModuleSlug.elections,
        url: '/polling-stations',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {usePollingStationsQuery} = electionsApi
