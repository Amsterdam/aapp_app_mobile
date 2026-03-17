import type {Coordinates} from '@/types/location'
import {AddressList, type PostalArea} from '@/modules/address/types'
import {ModuleSlug} from '@/modules/slugs'
import {baseApi} from '@/services/baseApi'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

type SharedParams = {rows?: number}

type AddressSuggestionQueryParams = {
  address: string
  city?: string
  street?: string
} & SharedParams

const keepUnusedDataFor = CacheLifetime.day

export const addressApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLocation: builder.query<AddressList | undefined, Coordinates>({
      query: params => ({
        url: generateRequestUrl<Coordinates>({
          params,
          path: '/coordinate',
        }),
        slug: ModuleSlug.address,
        keepUnusedDataFor,
      }),
    }),
    getAddressSuggestions: builder.query<
      AddressList | undefined,
      Omit<AddressSuggestionQueryParams, 'rows'>
    >({
      query: ({address, city, street}) => ({
        url: generateRequestUrl<{query: string; street_name?: string}>({
          params: {
            query: [address, city].filter(Boolean).join(' '),
            street_name: street,
          },
          path: '/address',
        }),
        slug: ModuleSlug.address,
        keepUnusedDataFor,
      }),
    }),
    getPostalArea: builder.query<PostalArea, Coordinates>({
      query: params => ({
        url: generateRequestUrl<Coordinates>({
          params,
          path: '/postal_area',
        }),
        slug: ModuleSlug.address,
        keepUnusedDataFor,
      }),
    }),
  }),

  overrideExisting: true,
})

export const {
  useGetLocationQuery,
  useGetAddressSuggestionsQuery,
  useGetPostalAreaQuery,
} = addressApi
