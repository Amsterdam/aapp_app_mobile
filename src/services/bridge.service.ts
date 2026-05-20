import {GlobalApiSlug} from '@/environment'
import {baseApi} from '@/services/baseApi'

export const bridgeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getServerTime: builder.query<string, void>({
      query: () => ({
        slug: GlobalApiSlug.bridge,
        url: `/time`,
      }),
      transformResponse: (response: {server_time: string}) =>
        response.server_time,
    }),
  }),
  overrideExisting: true,
})

export const {useGetServerTimeQuery} = bridgeApi
