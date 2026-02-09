import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react'
import {apiKeyForEnvironment, ApiSlug} from '@/environment'
import {devError, devInfo} from '@/processes/development'
import {
  PrepareHeaders,
  AfterBaseQueryErrorFn,
  AfterBaseQuerySuccessFn,
} from '@/services/types'
import {selectApi, selectEnvironment} from '@/store/slices/environment'
import {type RootState} from '@/store/types/rootState'
import {TimeOutDuration} from '@/types/api'
import {sleep} from '@/utils/sleep'
import {VERSION_NUMBER} from '@/utils/version'

const prepareHeaders: PrepareHeaders = (headers, {getState}) => {
  const state = getState() as RootState

  const {environment} = selectEnvironment(state)

  const apiKey = apiKeyForEnvironment[environment]

  if (apiKey) {
    headers.set('X-API-KEY', apiKey)
  } else {
    devError(`No API key in .env for environment ${environment}.`)
  }

  headers.set('releaseVersion', VERSION_NUMBER)

  return headers
}

const dynamicBaseQuery: BaseQueryFn<
  FetchArgs & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterError?: AfterBaseQueryErrorFn<any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    afterSuccess?: AfterBaseQuerySuccessFn<any>
    prepareHeaders?: PrepareHeaders
    slug: ApiSlug
  },
  unknown,
  FetchBaseQueryError
> = async (args, baseQueryApi, extraOptions) =>
  retry(
    async () => {
      const {
        slug,
        afterError,
        afterSuccess,
        prepareHeaders: argsPrepareHeaders = headers => headers,
      } = args

      const baseUrl = selectApi(slug)(baseQueryApi.getState() as RootState)

      const requestInfo = `${baseQueryApi.endpoint}: ${args.method ?? 'GET'} ${baseUrl}${args.url}`

      devInfo(`Request started: ${requestInfo}`)

      const result = await fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers, api) =>
          prepareHeaders(
            await argsPrepareHeaders(headers, {
              ...api,
              dispatch: baseQueryApi.dispatch,
            }),
            {
              ...api,
              dispatch: baseQueryApi.dispatch,
            },
          ),
        timeout: TimeOutDuration.long,
      })(args, baseQueryApi, extraOptions)

      const {error, meta} = result

      const status = meta?.response?.status ?? error?.status ?? 0

      if (!error) {
        devInfo(`Request success: ${requestInfo}`)
      } else {
        devError(
          `Request failed (${status}): ${requestInfo}, ${JSON.stringify(error.data)}`,
        )
      }

      if (status === 404) {
        retry.fail(error)
      }

      if (
        error?.status === 'FETCH_ERROR' ||
        error?.status === 'TIMEOUT_ERROR' ||
        error?.status === 502
      ) {
        await sleep(100)
      }

      if (error) {
        await afterError?.(result, baseQueryApi, retry.fail)
      } else {
        await afterSuccess?.(result, baseQueryApi)
      }

      return result
    },
    {maxRetries: 2},
  )(args, baseQueryApi, extraOptions as never)

export const baseApi = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: [
    'Articles',
    'CityPass',
    'FollowedProjects',
    'Form',
    'Modules',
    'Notifications',
    'ParkingLicensePlates',
    'ParkingSessions',
    'ParkingTransactions',
    'ParkingAccount',
    'ParkingPermits',
    'Projects',
    'WasteGuideNotifications',
    'BurningGuideNotifications',
    'MijnAmsterdam',
  ],
})
