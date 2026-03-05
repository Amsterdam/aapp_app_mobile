import {
  ServiceEndpointName,
  type ServiceOverViewResponse,
} from '@/modules/service/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

export const serviceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ServiceEndpointName.serviceOverview]: builder.query<
      ServiceOverViewResponse,
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
