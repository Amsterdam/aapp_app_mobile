import {CityOffice, ContactEndpointName} from '@/modules/contact/types'
import {ModuleSlug} from '@/modules/generated/slugs.generated'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'

export const contactApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    [ContactEndpointName.getCityOffices]: builder.query<CityOffice[], void>({
      query: () => ({
        slug: ModuleSlug.contact,
        url: '/city-offices',
      }),
      keepUnusedDataFor: CacheLifetime.hour,
      transformResponse: (response: {result: CityOffice[]}) => response.result,
    }),
  }),
  overrideExisting: true,
})

export const {useGetCityOfficesQuery} = contactApi
