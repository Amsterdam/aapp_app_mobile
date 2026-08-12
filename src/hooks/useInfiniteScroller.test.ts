import {skipToken} from '@reduxjs/toolkit/query'
import {renderHook, waitFor} from '@testing-library/react-native'
import type {Paginated, PaginationQueryArgs} from '@/types/api'
import type {ApiEndpointInfinite} from '@/types/api'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'

type TestItem = {
  dummy?: boolean
  id?: string | null
  label?: string | null
}

type TestQueryArgs = PaginationQueryArgs & {
  status?: string | null
}

type InfiniteQueryData = {
  pageParams: number[]
  pages: Paginated<TestItem>[]
}

type InfiniteQueryResult = {
  data?: InfiniteQueryData
  error?: unknown
  fetchNextPage: jest.Mock<Promise<void>, []>
  hasNextPage?: boolean | null
  isError: boolean
  isFetchingNextPage: boolean
  isLoading: boolean
}

const createFetchNextPageMock = (): jest.Mock<Promise<void>, []> =>
  jest.fn<Promise<void>, []>().mockResolvedValue(undefined)

const createPage = (
  result: TestItem[],
  totalElements: number,
  size = 2,
  number = 1,
): Paginated<TestItem> => ({
  _links: {
    next: {href: ''},
    previous: {href: ''},
    self: {href: ''},
  },
  page: {
    number,
    size,
    totalElements,
    totalPages: Math.max(1, Math.ceil(totalElements / size)),
  },
  result,
})

const createInfiniteQueryResult = (
  overrides: Partial<InfiniteQueryResult> = {},
): InfiniteQueryResult => ({
  data: undefined,
  error: undefined,
  fetchNextPage: createFetchNextPageMock(),
  hasNextPage: false,
  isError: false,
  isFetchingNextPage: false,
  isLoading: false,
  ...overrides,
})

const createEndpoint = (result: InfiniteQueryResult) =>
  ({
    useInfiniteQuery: jest.fn().mockReturnValue(result),
  }) as unknown as ApiEndpointInfinite<TestItem, TestQueryArgs>

describe('useInfiniteScroller', () => {
  it('maps fetched items, appends dummy items, and passes the query args through', () => {
    const queryParams: TestQueryArgs = {page_size: 2, status: 'completed'}
    const endpoint = createEndpoint(
      createInfiniteQueryResult({
        data: {
          pageParams: [1, 2],
          pages: [
            createPage(
              [
                {id: 'item-1', label: 'first'},
                {id: 'item-2', label: 'second'},
              ],
              5,
              2,
              1,
            ),
            createPage([{id: 'item-3', label: 'third'}], 5, 2, 2),
          ],
        },
      }),
    )

    const {result} = renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        endpoint,
        'id',
        1,
        2,
        queryParams,
      ),
    )

    expect(endpoint.useInfiniteQuery).toHaveBeenCalledWith(queryParams, {
      initialPageParam: 1,
    })
    expect(result.current.data).toEqual([
      {id: 'item-1', label: 'first', page: 1},
      {id: 'item-2', label: 'second', page: 1},
      {id: 'item-3', label: 'third', page: 2},
      {dummy: true, id: 'dummy-3', label: 'placeholder', page: 2},
      {dummy: true, id: 'dummy-4', label: 'placeholder', page: 3},
    ])
  })

  it('fetches the next page when the requested page reaches the last loaded page', async () => {
    const fetchNextPage = jest.fn().mockResolvedValue(undefined)
    const endpoint = createEndpoint(
      createInfiniteQueryResult({
        data: {
          pageParams: [1, 2],
          pages: [
            createPage([{id: 'item-1', label: 'first'}], 2, 1, 1),
            createPage([{id: 'item-2', label: 'second'}], 2, 1, 2),
          ],
        },
        fetchNextPage,
        hasNextPage: true,
      }),
    )

    renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        endpoint,
        'id',
        2,
        1,
        {page_size: 1},
      ),
    )

    await waitFor(() => {
      expect(fetchNextPage).toHaveBeenCalledTimes(1)
    })

    renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        endpoint,
        'id',
        3,
        1,
        {page_size: 1},
      ),
    )

    await waitFor(() => {
      expect(fetchNextPage).toHaveBeenCalledTimes(2)
    })
  })

  it('returns an empty list when query params are skipped', () => {
    const fetchNextPage = jest.fn().mockResolvedValue(undefined)
    const endpoint = createEndpoint(
      createInfiniteQueryResult({
        data: {
          pageParams: [1],
          pages: [createPage([{id: 'item-1', label: 'first'}], 1, 1, 1)],
        },
        fetchNextPage,
        hasNextPage: false,
      }),
    )

    const {result} = renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        endpoint,
        'id',
        3,
        1,
        skipToken,
      ),
    )

    expect(result.current.data).toEqual([])
    expect(fetchNextPage).not.toHaveBeenCalled()
  })

  it('creates loading placeholders when no page has been loaded yet', () => {
    const endpoint = createEndpoint(
      createInfiniteQueryResult({
        isLoading: true,
      }),
    )

    const {result} = renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        endpoint,
        'id',
        1,
        3,
        {page_size: 3},
      ),
    )

    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toEqual([
      {dummy: true, id: 'dummy-0', label: 'placeholder', page: 1},
      {dummy: true, id: 'dummy-1', label: 'placeholder', page: 1},
      {dummy: true, id: 'dummy-2', label: 'placeholder', page: 1},
    ])
  })

  it('does not add dummy items when all items are loaded and match the reported total', () => {
    const endpoint = createEndpoint(
      createInfiniteQueryResult({
        data: {
          pageParams: [1],
          pages: [
            createPage(
              [
                {id: 'item-1', label: 'first'},
                {id: 'item-2', label: 'second'},
              ],
              2,
              2,
              1,
            ),
          ],
        },
      }),
    )

    const {result} = renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        endpoint,
        'id',
        1,
        2,
        {page_size: 2},
      ),
    )

    expect(result.current.data).toEqual([
      {id: 'item-1', label: 'first', page: 1},
      {id: 'item-2', label: 'second', page: 1},
    ])
  })

  it.each([
    ['undefined', undefined],
    ['null', null],
  ])('throws when endpoint is %s', (_, endpointValue) => {
    expect(() =>
      renderHook(() =>
        useInfiniteScroller(
          {id: 'empty', label: 'placeholder'},
          endpointValue as never,
          'id',
          1,
          2,
          {page_size: 2},
        ),
      ),
    ).toThrow()
  })

  it.each([
    ['undefined', undefined],
    ['null', null],
  ])(
    'creates placeholder items when defaultEmptyItem is %s',
    (_, defaultEmptyItem) => {
      const endpoint = createEndpoint(
        createInfiniteQueryResult({
          isLoading: true,
        }),
      )

      const {result} = renderHook(() =>
        useInfiniteScroller(defaultEmptyItem as never, endpoint, 'id', 1, 2, {
          page_size: 2,
        }),
      )

      expect(result.current.data).toEqual([
        {dummy: true, id: 'dummy-0', page: 1},
        {dummy: true, id: 'dummy-1', page: 1},
      ])
    },
  )

  it.each([
    ['undefined', undefined, 'undefined'],
    ['null', null, 'null'],
  ])(
    'coerces %s keyName to a property name on placeholder items',
    (_, keyName, expectedKeyName) => {
      const endpoint = createEndpoint(
        createInfiniteQueryResult({
          isLoading: true,
        }),
      )

      const {result} = renderHook(() =>
        useInfiniteScroller(
          {id: 'empty', label: 'placeholder'},
          endpoint,
          keyName as never,
          1,
          1,
          {page_size: 1},
        ),
      )

      expect(result.current.data).toEqual([
        {
          dummy: true,
          id: 'empty',
          label: 'placeholder',
          page: 1,
          [expectedKeyName]: 'dummy-0',
        },
      ])
    },
  )

  it('uses the default page when page is undefined and avoids fetching when page is null', async () => {
    const fetchNextPage = jest.fn().mockResolvedValue(undefined)
    const endpoint = createEndpoint(
      createInfiniteQueryResult({
        data: {
          pageParams: [1],
          pages: [createPage([{id: 'item-1', label: 'first'}], 1, 1, 1)],
        },
        fetchNextPage,
        hasNextPage: true,
      }),
    )

    renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        endpoint,
        'id',
        undefined,
        1,
        {page_size: 1},
      ),
    )

    await waitFor(() => {
      expect(fetchNextPage).toHaveBeenCalledTimes(1)
    })

    fetchNextPage.mockClear()

    renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        endpoint,
        'id',
        null as never,
        1,
        {page_size: 1},
      ),
    )

    expect(fetchNextPage).not.toHaveBeenCalled()
  })

  it('uses the default page size for undefined and leaves loaded items unchanged for null', () => {
    const loadingEndpoint = createEndpoint(
      createInfiniteQueryResult({
        isLoading: true,
      }),
    )

    const {result: loadingResult} = renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        loadingEndpoint,
        'id',
        1,
        undefined,
        {page_size: 10},
      ),
    )

    expect(loadingResult.current.data).toHaveLength(10)

    const loadedEndpoint = createEndpoint(
      createInfiniteQueryResult({
        data: {
          pageParams: [1],
          pages: [createPage([{id: 'item-1', label: 'first'}], 1, 1, 1)],
        },
      }),
    )

    const {result: loadedResult} = renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        loadedEndpoint,
        'id',
        1,
        null as never,
        {page_size: 1},
      ),
    )

    expect(loadedResult.current.data).toEqual([
      {id: 'item-1', label: 'first', page: 1},
    ])
  })

  it('uses the default empty object when queryParams are undefined', () => {
    const endpoint = createEndpoint(
      createInfiniteQueryResult({
        data: {
          pageParams: [1],
          pages: [createPage([{id: 'item-1', label: 'first'}], 1, 1, 1)],
        },
      }),
    )

    const {result} = renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        endpoint,
        'id',
        1,
        1,
        undefined,
      ),
    )

    expect(endpoint.useInfiniteQuery).toHaveBeenCalledWith(
      {},
      {
        initialPageParam: 1,
      },
    )
    expect(result.current.data).toEqual([
      {id: 'item-1', label: 'first', page: 1},
    ])
  })

  it('passes null queryParams through to the endpoint', () => {
    const endpoint = createEndpoint(
      createInfiniteQueryResult({
        data: {
          pageParams: [1],
          pages: [createPage([{id: 'item-1', label: 'first'}], 1, 1, 1)],
        },
      }),
    )

    const {result} = renderHook(() =>
      useInfiniteScroller(
        {id: 'empty', label: 'placeholder'},
        endpoint,
        'id',
        1,
        1,
        null as never,
      ),
    )

    expect(endpoint.useInfiniteQuery).toHaveBeenCalledWith(null, {
      initialPageParam: 1,
    })
    expect(result.current.data).toEqual([
      {id: 'item-1', label: 'first', page: 1},
    ])
  })
})
