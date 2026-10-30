import {DeviatingApiSlug} from '@/environment'
import {baseApi} from '@/services/baseApi'
import {deviceIdHeader} from '@/services/headers'
import {generateRequestUrl} from '@/utils/api'

export const mijnAmsterdamApi = baseApi.injectEndpoints({
  endpoints: builder => ({
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

export const {useGetMijnAmsterdamAccessTokenMutation} = mijnAmsterdamApi
