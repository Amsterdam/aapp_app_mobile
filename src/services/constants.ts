import type {Paginated} from '@/types/api'
import type {InfiniteQueryConfigOptions} from '@reduxjs/toolkit/query'

export const INFINITE_QUERY_OPTIONS: InfiniteQueryConfigOptions<
  Paginated<unknown>,
  number,
  unknown
> = {
  initialPageParam: 1,
  getNextPageParam: (lastPage, _allPages, lastPageParam) =>
    lastPage.page.totalPages > lastPageParam ? lastPageParam + 1 : undefined,
  getPreviousPageParam: (_firstPage, _allPages, firstPageParam) =>
    firstPageParam > 1 ? firstPageParam - 1 : undefined,
}
