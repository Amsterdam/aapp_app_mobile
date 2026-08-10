import {
  type BaseQueryFn,
  type EndpointDefinitions,
  type FetchArgs,
  type FetchBaseQueryError,
  type InfiniteQueryDefinition,
  skipToken,
} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import type {ApiSlug} from '@/environment'
import type {Paginated, PaginationQueryArgs} from '@/types/api'
import type {
  ApiEndpointInfiniteQuery,
  TypedUseInfiniteQuery,
  TypedUseInfiniteQueryState,
  TypedUseInfiniteQuerySubscription,
} from '@reduxjs/toolkit/query/react'

const getEmptyItems = <DummyItem>(
  length: number,
  baseIndex: number,
  defaultEmptyItem: DummyItem,
  keyName: keyof DummyItem,
) =>
  length > 0
    ? Array<DummyItem>(Math.max(0, length))
        .fill(defaultEmptyItem)
        .map((el, index) => ({
          ...el,
          [keyName]: `dummy-${index + baseIndex}`,
          dummy: true,
        }))
    : []

const config = {
  page: 1,
  totalPages: 1,
  pageSize: 10,
}

export const useInfiniteScroller = <
  Item,
  QueryArgs extends PaginationQueryArgs,
>(
  defaultEmptyItem: Item & {dummy?: boolean},
  endpoint: ApiEndpointInfiniteQuery<
    InfiniteQueryDefinition<
      QueryArgs,
      number,
      BaseQueryFn<FetchArgs & {slug: ApiSlug}, unknown, FetchBaseQueryError>,
      string,
      Paginated<Item>
    >,
    EndpointDefinitions
  > & {
    useInfiniteQuery: TypedUseInfiniteQuery<
      Paginated<Item>,
      QueryArgs,
      number,
      BaseQueryFn<FetchArgs & {slug: ApiSlug}, unknown, FetchBaseQueryError>
    >
    useInfiniteQueryState: TypedUseInfiniteQueryState<
      Paginated<Item>,
      QueryArgs,
      number,
      BaseQueryFn<FetchArgs & {slug: ApiSlug}, unknown, FetchBaseQueryError>
    >
    useInfiniteQuerySubscription: TypedUseInfiniteQuerySubscription<
      Paginated<Item>,
      QueryArgs,
      number,
      BaseQueryFn<FetchArgs & {slug: ApiSlug}, unknown, FetchBaseQueryError>
    >
  },
  keyName: keyof (Item & {dummy?: boolean}),
  page = config.page,
  pageSize = config.pageSize,
  queryParams: QueryArgs | typeof skipToken = {} as QueryArgs,
) => {
  const {
    data: currentData,
    isError: isErrorCurrentPage,
    isLoading: isLoadingCurrentPage,
    error: errorCurrentPage,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = endpoint.useInfiniteQuery(queryParams, {initialPageParam: 1})

  useEffect(() => {
    if (
      hasNextPage &&
      page >= (currentData?.pageParams.at(-1) ?? 0) &&
      !isFetchingNextPage
    ) {
      void fetchNextPage()
    }
  }, [
    currentData?.pageParams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    page,
  ])

  const totalElements = currentData?.pages[0]?.page.totalElements ?? 0

  const fetchedData =
    queryParams === skipToken
      ? []
      : (currentData?.pages.flatMap(({result}, index) =>
          result.map(item => ({...item, page: index + 1})),
        ) ?? [])

  const numberOfDummyItems = totalElements - fetchedData.length

  const data: Array<Item & {dummy?: boolean; page: number}> =
    queryParams === skipToken
      ? []
      : [
          ...fetchedData,
          ...getEmptyItems(
            numberOfDummyItems,
            fetchedData.length,
            defaultEmptyItem,
            keyName,
          ).map((item, index) => ({
            ...item,
            page:
              Math.floor(
                (totalElements - index - fetchedData.length) / pageSize,
              ) + 1,
          })),
        ]

  return {
    data,
    error: errorCurrentPage,
    isError: isErrorCurrentPage,
    isLoading: isLoadingCurrentPage,
  }
}
