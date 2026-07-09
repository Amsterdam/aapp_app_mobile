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
      transformResponse: (response: ServiceMapResponse) => {
        if (response.icons_to_include?.canal_parade) {
          return {
            ...response,
            icons_to_include: {
              ...response.icons_to_include,
              canal_parade: {
                ...response.icons_to_include.canal_parade,
                colors: ['#ff0000', '#ffc400', '#00bf07', '#004ffb'],
              },
            },
          }
        } else {
          return response
        }
      },
    }),
  }),
  overrideExisting: false,
})

export const {useServiceOverviewQuery, useServiceQuery} = serviceApi
