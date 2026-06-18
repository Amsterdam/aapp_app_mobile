import {
  type ApiEndpointQuery,
  type BaseQueryFn,
  type EndpointDefinitions,
  type FetchArgs,
  type FetchBaseQueryError,
  type QueryDefinition,
  QueryStatus,
  skipToken,
} from '@reduxjs/toolkit/query'
import {useEffect, useState} from 'react'
import type {ApiSlug} from '@/environment'
import type {Paginated, PaginationQueryArgs} from '@/types/api'
import type {SerializedError} from '@reduxjs/toolkit'
import {useSelector} from '@/hooks/redux/useSelector'
import {baseApi} from '@/services/baseApi'

const getEmptyItems = <DummyItem>(
  length: number,
  baseIndex: number,
  defaultEmptyItem: DummyItem,
  keyName: keyof DummyItem,
) =>
  length > 0
    ? Array<DummyItem>(length)
        .fill(defaultEmptyItem)
        .map((el, index) => ({
          ...el,
          [keyName]: `dummy-${index + baseIndex}`,
        }))
    : []

const config = {
  page: 1,
  totalPages: 1,
  pageSize: 10,
}

type QueryDef<Item, QueryArgs extends PaginationQueryArgs> = QueryDefinition<
  QueryArgs,
  BaseQueryFn<FetchArgs & {slug: ApiSlug}, unknown, FetchBaseQueryError>,
  string,
  Paginated<Item>
>

type UseQueryHook<QueryArgs, Result> = (arg: QueryArgs | typeof skipToken) => {
  data?: Result
  error?: FetchBaseQueryError | SerializedError
  isError: boolean
  isLoading: boolean
}

export const useInfiniteScroller = <
  Item,
  ItemOrDummyItem,
  QueryArgs extends PaginationQueryArgs,
>(
  defaultEmptyItem: ItemOrDummyItem,
  endpoint: ApiEndpointQuery<QueryDef<Item, QueryArgs>, EndpointDefinitions>,
  keyName: keyof ItemOrDummyItem,
  useQueryHook: UseQueryHook<QueryArgs, Paginated<Item>>,
  page = config.page,
  pageSize = config.pageSize,
  queryParams: QueryArgs | typeof skipToken = {} as QueryArgs,
) => {
  const reduxApiState = useSelector(state => state[baseApi.reducerPath])
  const [totalPages, setTotalPages] = useState<number>(config.totalPages)

  const {
    data: previousData,
    isError: isErrorPreviousPage,
    isLoading: isLoadingPreviousPage,
    error: errorPreviousPage,
  } = useQueryHook(
    page > 1 && queryParams !== skipToken
      ? {
          ...queryParams,
          page: page - 1,
        }
      : skipToken,
  )

  const {
    data: currentData,
    isError: isErrorCurrentPage,
    isLoading: isLoadingCurrentPage,
    error: errorCurrentPage,
  } = useQueryHook(
    page <= totalPages && queryParams !== skipToken
      ? {
          ...queryParams,
          page,
        }
      : skipToken,
  )

  const {
    data: nextData,
    isError: isErrorNextPage,
    isLoading: isLoadingNextPage,
    error: errorNextPage,
  } = useQueryHook(
    page < totalPages && queryParams !== skipToken
      ? {
          ...queryParams,
          page: page + 1,
        }
      : skipToken,
  )

  useEffect(() => {
    if (currentData?.page.totalPages) {
      setTotalPages(currentData?.page.totalPages)
    }
  }, [currentData?.page.totalPages])

  const totalElements =
    previousData?.page.totalElements ??
    currentData?.page.totalElements ??
    nextData?.page.totalElements ??
    0

  const endpointSelectorState = {
    [baseApi.reducerPath]: reduxApiState,
  } as Parameters<ReturnType<typeof endpoint.select>>[0]

  return {
    // create an array of pages with data
    data:
      queryParams === skipToken
        ? []
        : (Array(totalPages)
            // fill the array with empty values
            .fill({})
            // map over the array and fill it with data
            .reduce<unknown[]>((acc, _s, index) => {
              const {data, status} = endpoint.select({
                ...queryParams,
                page: index + 1,
              })(endpointSelectorState)
              // if there is no data, fill the page with empty items
              const pageData =
                data?.result && status === QueryStatus.fulfilled
                  ? data?.result
                  : getEmptyItems<ItemOrDummyItem>(
                      Math.min(pageSize, totalElements - index * pageSize),
                      index * pageSize,
                      defaultEmptyItem,
                      keyName,
                    )

              return [
                ...acc,
                ...pageData.map(item => ({...item, page: index + 1})),
              ]
            }, []) as Array<ItemOrDummyItem & {page: number}>),
    error: errorPreviousPage || errorCurrentPage || errorNextPage,
    isError: isErrorPreviousPage || isErrorCurrentPage || isErrorNextPage,
    isLoading:
      isLoadingPreviousPage || isLoadingCurrentPage || isLoadingNextPage,
  }
}
