import type {ModuleServerConfig} from '@/modules/types'
import type {QueryReturnValue} from '@/services/types'
import {DeviatingApiSlug, GlobalApiSlug} from '@/environment'
import {setCachedThemes, setIsLoggedIn} from '@/modules/mijn-amsterdam/slice'
import {
  GetMijnAmsterdamLogin,
  MijnAmsterdamLoginStatus,
} from '@/modules/mijn-amsterdam/types'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {CacheLifetime} from '@/types/api'
import {generateRequestUrl} from '@/utils/api'
import {VERSION_NUMBER} from '@/utils/version'

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
    getMijnAmsterdamThemes: builder.query<{themes: ModuleServerConfig[]}, void>(
      {
        providesTags: ['MijnAmsterdam'],
        query: () => ({
          slug: GlobalApiSlug.modules,
          url: `/themes/${VERSION_NUMBER}`,
          afterSuccess: ({data}, {dispatch}) => {
            dispatch(
              setCachedThemes((data as {themes: ModuleServerConfig[]}).themes),
            )
          },
        }),
      },
    ),
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
  useGetMijnAmsterdamThemesQuery,
} = mijnAmsterdamApi
