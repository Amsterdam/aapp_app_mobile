import {DeviatingApiSlug} from '@/environment'
import {
  GetMijnAmsterdamLogin,
  GetMijnAmsterdamLoginStatus,
} from '@/modules/mijn-amsterdam/types'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

const mijnAmsterdamApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMijnAmsterdamLoginStatus: builder.query<{isLoggedIn: boolean}, void>({
      providesTags: ['MijnAmsterdam'],
      query: () => ({
        slug: DeviatingApiSlug.mijnAmsterdam,
        url: generateRequestUrl({
          path: '/device',
          params: {},
        }),
        headers: deviceIdHeader,
      }),
      keepUnusedDataFor: CacheLifetime.minute,
      transformResponse: ({status}: GetMijnAmsterdamLogin) => ({
        isLoggedIn: status === GetMijnAmsterdamLoginStatus.loggedIn,
      }),
    }),
    mijnAmsterdamLogout: builder.mutation<void, void>({
      invalidatesTags: ['MijnAmsterdam'],
      query: () => ({
        slug: DeviatingApiSlug.mijnAmsterdam,
        method: 'DELETE',
        url: generateRequestUrl({
          path: '/device',
          params: {},
        }),
        headers: deviceIdHeader,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetMijnAmsterdamLoginStatusQuery,
  useMijnAmsterdamLogoutMutation,
} = mijnAmsterdamApi
