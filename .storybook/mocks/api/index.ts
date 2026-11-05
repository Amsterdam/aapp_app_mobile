import type {
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery as fetchBaseQueryOriginal,
} from '@reduxjs/toolkit/query/react'

export type ApiMockHandler<
  Args = string | Record<string, unknown>,
  Return = unknown,
  QueryError = FetchBaseQueryError,
> = (
  params: FetchArgs & {params: Args},
) => {status: number} & Or<{data: Return}, {error: QueryError}>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let nextResponse: ApiMockHandler<any, unknown, unknown> = _params => ({
  data: null,
  status: 200,
})

export const setNextResponse = <
  Args = string | Record<string, unknown>,
  Return = unknown,
  QueryError = FetchBaseQueryError,
>(
  next: ApiMockHandler<Args, Return, QueryError>,
) => {
  nextResponse = next
}

export const fetchBaseQuery: typeof fetchBaseQueryOriginal =
  () => async args => {
    const {status, ...result} = nextResponse(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args as FetchArgs & {params: any},
    )

    return {...result, meta: {response: {status}}} as ReturnType<
      ReturnType<typeof fetchBaseQueryOriginal>
    >
  }
