import {skipToken} from '@reduxjs/toolkit/query'
import {useEffect} from 'react'
import type {WithDummyAndPage} from '@/services/types'
import type {ApiEndpointInfinite, PaginationQueryArgs} from '@/types/api'

const getEmptyItems = <DummyItem>(
  length: number,
  baseIndex: number,
  defaultEmptyItem: DummyItem,
  keyName: keyof DummyItem,
) =>
  length > 0
    ? Array.from<DummyItem>({length: Math.max(0, length)})
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

/**
 * Builds a paged list for infinite scrolling by combining fetched items with
 * dummy placeholder items up to the reported total result size.
 *
 * The hook automatically fetches the next page once the requested `page`
 * reaches the last loaded page.
 *
 * @param defaultEmptyItem Base item shape used to generate placeholder rows.
 * @param endpoint RTK Query infinite endpoint that returns paginated results.
 * @param keyName Unique item key used to assign stable ids to dummy rows.
 * @param page Current page that should be available in the local result.
 * @param pageSize Number of items expected per page.
 * @param queryParams Query parameters for the endpoint, or `skipToken` to disable fetching.
 *
 * @example
 * const result = useInfiniteScroller(
 *   dummyBoatChargingHistoryItem,
 *   boatChargingApi.endpoints[BoatChargingEndpointName.boatChargingSessions],
 *   'id',
 *   page,
 *   PAGE_SIZE,
 *   isLoggedIn
 *     ? {
 *         page_size: PAGE_SIZE,
 *         status: SessionStatus.COMPLETED,
 *       }
 *     : skipToken,
 * )
 */
export const useInfiniteScroller = <
  Item,
  QueryArgs extends PaginationQueryArgs,
>(
  defaultEmptyItem: Item,
  endpoint: ApiEndpointInfinite<Item, QueryArgs>,
  keyName: keyof Item,
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

  const totalElements =
    currentData?.pages[0]?.page.totalElements ??
    (isLoadingCurrentPage ? pageSize : 0)

  const fetchedData =
    queryParams === skipToken
      ? []
      : (currentData?.pages.flatMap(({result}, index) =>
          result.map(item => ({...item, page: index + 1})),
        ) ?? [])

  const numberOfDummyItems = totalElements - fetchedData.length

  const data: Array<WithDummyAndPage<Item>> =
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
            page: Math.floor((index + fetchedData.length) / pageSize) + 1,
          })),
        ]

  return {
    data,
    error: errorCurrentPage,
    isError: isErrorCurrentPage,
    isLoading: isLoadingCurrentPage,
  }
}
