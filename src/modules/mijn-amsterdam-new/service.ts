import type {QueryReturnValue} from '@/services/types'
import {DeviatingApiSlug} from '@/environment'
import {setIsLoggedIn} from '@/modules/mijn-amsterdam-new/slice'
import {
  GetMijnAmsterdamLogin,
  MijnAmsterdamLoginStatus,
} from '@/modules/mijn-amsterdam-new/types'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'

export const mijnAmsterdamApi = baseApi.injectEndpoints({
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
            setIsLoggedIn({
              isLoggedIn: data?.status === MijnAmsterdamLoginStatus.loggedIn,
              profileName: data?.profile_name,
            }),
          )
        },
      }),
      keepUnusedDataFor: CacheLifetime.minute,
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
    getMijnAmsterdamAccessToken: builder.mutation<
      {session: {name: string; value: string}},
      {authorizationCode: string; codeVerifier: string}
    >({
      query: ({codeVerifier, authorizationCode}) => ({
        slug: DeviatingApiSlug.mijnAmsterdam,
        method: 'POST',
        url: generateRequestUrl({
          path: '/access-token',
          params: {},
        }),
        body: {
          code_verifier: codeVerifier,
          authorization_code: authorizationCode,
        },
        headers: deviceIdHeader,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetMijnAmsterdamLoginStatusQuery,
  useMijnAmsterdamLogoutMutation,
  useGetMijnAmsterdamAccessTokenMutation,
} = mijnAmsterdamApi
