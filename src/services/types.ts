import type {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      data: T
      // eslint-disable-next-line sonarjs/no-redundant-optional
      error?: undefined
      meta?: M
    }
  | {
      // eslint-disable-next-line sonarjs/no-redundant-optional
      data?: undefined
      error: E
      meta?: M
    }

type RTKQueryAPI = Pick<
  BaseQueryApi,
  'endpoint' | 'getState' | 'type' | 'extra' | 'forced' | 'dispatch'
>

export type PrepareHeaders = (
  headers: Headers,
  api: RTKQueryAPI,
) => Headers | Promise<Headers>

export type AfterBaseQuerySuccessFn<T = unknown> = (
  result: QueryReturnValue<T, FetchBaseQueryError, FetchBaseQueryMeta>,
  api: RTKQueryAPI,
) => void | Promise<void>

export type AfterBaseQueryErrorFn<T = unknown> = (
  result: QueryReturnValue<T, FetchBaseQueryError, FetchBaseQueryMeta>,
  api: RTKQueryAPI,
  failRetry: (e?: unknown) => void,
) => void | Promise<void>
