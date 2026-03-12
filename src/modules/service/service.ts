import {
  ServiceEndpointName,
  type ServiceItem,
  type ServiceMapResponse,
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
        method: 'GET',
        slug: ModuleSlug.service,
        url: '/maps',
      }),
    }),
    [ServiceEndpointName.serviceMap]: builder.query<
      ServiceMapResponse,
      ServiceItem['id']
    >({
      query: serviceId => ({
        method: 'GET',
        slug: ModuleSlug.service,
        url: `/maps/${serviceId}`,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {useServiceOverviewQuery, useServiceMapQuery} = serviceApi
