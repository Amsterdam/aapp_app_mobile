import {
  ServiceEndpointName,
  type Service,
  type ServiceMapResponse,
  type ServiceModuleSource,
  type ServiceOverviewResponse,
} from '@/modules/service/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'

export const serviceApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ServiceEndpointName.serviceOverview]: builder.query<
      ServiceOverviewResponse,
      ServiceModuleSource
    >({
      query: module_source => ({
        method: 'GET',
        slug: ModuleSlug.service,
        url: '/maps',
        params: {module_source},
      }),
    }),
    [ServiceEndpointName.service]: builder.query<
      ServiceMapResponse,
      Service['id']
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

export const {useServiceOverviewQuery, useServiceQuery} = serviceApi
