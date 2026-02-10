import type {QueryReturnValue} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import {DeviatingApiSlug} from '@/environment'
import {setIsLoggedIn} from '@/modules/mijn-amsterdam/slice'
import {
  GetMijnAmsterdamLogin,
  MijnAmsterdamLoginStatus,
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
        afterSuccess: (
          {data}: QueryReturnValue<GetMijnAmsterdamLogin>,
          {dispatch},
        ) => {
          dispatch(
            setIsLoggedIn(data?.status === MijnAmsterdamLoginStatus.loggedIn),
          )
        },
      }),
      keepUnusedDataFor: CacheLifetime.minute,
      transformResponse: ({status}: GetMijnAmsterdamLogin) => ({
        isLoggedIn: status === MijnAmsterdamLoginStatus.loggedIn,
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
