import {
  ServiceEndpointName,
  type ServiceOverviewResponse,
} from '@/modules/service/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

export const serviceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ServiceEndpointName.serviceOverview]: builder.query<
      ServiceOverviewResponse,
      void
    >({
      query: () => ({
        slug: ModuleSlug.service,
        url: '/maps',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {useServiceOverviewQuery} = serviceApi
