import {type BaseQueryApi} from '@reduxjs/toolkit/query'
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from '@reduxjs/toolkit/query/react'
import {apiKeyForEnvironment, ApiSlug} from '@/environment'
import {tagTypes as boatChargingTagTypes} from '@/modules/boat-charging/constants'
import {tagTypes as cityPassTagTypes} from '@/modules/city-pass/constants'
import {tagTypes as parkingTagTypes} from '@/modules/parking/constants'
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

const HTTP_STATUS_NOT_FOUND = 404
const HTTP_STATUS_BAD_GATEWAY = 502

const shouldDelayRetry = (status: FetchBaseQueryError['status'] | undefined) =>
  status === 'FETCH_ERROR' ||
  status === 'TIMEOUT_ERROR' ||
  status === HTTP_STATUS_BAD_GATEWAY

const logRequestResult = (
  status: FetchBaseQueryError['status'] | undefined,
  requestInfo: string,
  error: FetchBaseQueryError | undefined,
) => {
  if (error) {
    devError(
      `Request failed (${status}): ${requestInfo}, ${JSON.stringify(error.data)}`,
    )
  } else {
    devInfo(`Request success: ${requestInfo}`)
  }
}

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

type DynamicBaseQueryArguments = FetchArgs & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterError?: AfterBaseQueryErrorFn<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterSuccess?: AfterBaseQuerySuccessFn<any>
  prepareHeaders?: PrepareHeaders
  slug: ApiSlug
}

const dynamicBaseQuery: BaseQueryFn<
  DynamicBaseQueryArguments,
  unknown,
  FetchBaseQueryError,
  object
> = async (args, baseQueryApi, extraOptions) => {
  const retryingBaseQuery = retry(
    async (
      requestArguments: DynamicBaseQueryArguments,
      retryBaseQueryApi: BaseQueryApi,
      retryExtraOptions: unknown,
    ) => {
      const {
        slug,
        afterError,
        afterSuccess,
        prepareHeaders: argsPrepareHeaders = (headers: Headers) => headers,
        method,
        url,
        // oxlint-disable-next-line typescript/no-unsafe-assignment
        body,
      } = requestArguments

      // this prevents sending post requests with an empty body, which causes issues with the firewall when sending from android
      const newBody: unknown = method === 'POST' ? (body ?? {}) : body

      const baseUrl = selectApi(slug)(retryBaseQueryApi.getState() as RootState)

      const requestInfo = `${retryBaseQueryApi.endpoint}: ${method ?? 'GET'} ${baseUrl}${url}`

      devInfo(`Request started: ${requestInfo}`)

      const result = await fetchBaseQuery({
        baseUrl,
        prepareHeaders: async (headers, api) =>
          prepareHeaders(
            await argsPrepareHeaders(headers, {
              ...api,
              dispatch: retryBaseQueryApi.dispatch,
            }),
            {
              ...api,
              dispatch: retryBaseQueryApi.dispatch,
            },
          ),
        timeout: TimeOutDuration.long,
      })(
        {...requestArguments, body: newBody},
        retryBaseQueryApi,
        retryExtraOptions as never,
      )

      const {error, meta} = result

      const status = meta?.response?.status ?? error?.status ?? 0

      logRequestResult(status, requestInfo, error)

      if (error) {
        await afterError?.(result, retryBaseQueryApi, retry.fail, false)
      } else {
        await afterSuccess?.(result, retryBaseQueryApi)
      }

      if (status === HTTP_STATUS_NOT_FOUND) {
        retry.fail(error)
      }

      if (shouldDelayRetry(error?.status)) {
        await sleep(100)
      }

      return result
    },
    {maxRetries: 2},
  )

  const result = await retryingBaseQuery(args, baseQueryApi, extraOptions)

  if (result.error) {
    await args.afterError?.(result, baseQueryApi, () => null, true)
  }

  return result
}

export const baseApi = createApi({
  baseQuery: dynamicBaseQuery,
  endpoints: () => ({}),
  reducerPath: 'api',
  tagTypes: [
    ...parkingTagTypes,
    ...cityPassTagTypes,
    ...boatChargingTagTypes,
    'Articles',
    'FollowedProjects',
    'Form',
    'Modules',
    'Notifications',
    'Projects',
    'NotificationSubscriptions',
    'NewsLiveblogNotifications',
    'MijnAmsterdam',
  ],
})
