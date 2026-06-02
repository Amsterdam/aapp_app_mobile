import {
  type AnyAction,
  isRejectedWithValue,
  type Middleware,
  type PayloadAction,
} from '@reduxjs/toolkit'
import {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {isExpectedError} from '@/processes/logging/utils/isExpectedError'
import {isStatusCodeAllowedForLogging} from '@/processes/logging/utils/isStatusCodeAllowedForLogging'
import {appInsights} from '@/providers/appinsights.provider'

type Meta =
  | {arg?: {endpointName?: string}; baseQueryMeta?: {request?: {url: string}}}
  | undefined

type Payload =
  | {error: unknown; originalStatus?: number | string; status?: string}
  | undefined

const logRequestFailed = (
  action: Pick<PayloadAction<Payload, string, Meta>, 'meta' | 'payload'>,
) => {
  const endpoint = action.meta?.arg?.endpointName
  const originalStatus = action.payload?.originalStatus
  const status = action.payload?.status

  if (
    !isStatusCodeAllowedForLogging(originalStatus ?? status) ||
    isExpectedError(endpoint, action.payload as FetchBaseQueryError)
  ) {
    return
  }

  let title = 'Rejected RTK action'

  if (endpoint) {
    title = `${originalStatus ?? status ?? 'Error'} for ${endpoint}`
  }

  const errorTitle = `All request retries failed: ${title}`

  const url = action.meta?.baseQueryMeta?.request?.url

  if (url && !url.startsWith('http://localhost')) {
    appInsights.trackException({
      exception: new Error(errorTitle),
      properties: {
        endpoint,
        originalStatus,
        status,
        error: action.payload?.error,
        url,
      },
    })
  }
}

/**
 * RTK middleware to catch API errors and other rejections
 */
export const reduxLoggerMiddleware: Middleware =
  () => next => (action: AnyAction) => {
    if (isRejectedWithValue(action)) {
      logRequestFailed(action as PayloadAction<Payload, string, Meta>)
    }

    const result: unknown = next(action)

    return result
  }
