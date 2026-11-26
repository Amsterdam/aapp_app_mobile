import type {Meta, StoryObj} from '@storybook/react-native-web-vite'
import type {ReduxDispatch} from '@/hooks/redux/types'
import {NewsList} from '@/modules/news/components/NewsList'
import {newsApi} from '@/modules/news/service'
import {
  NewsEndpointName,
  type NewsArticlesQueryArgs,
  type NewsArticlesResponse,
} from '@/modules/news/types'
import {store} from '@/store/store'
import {setNextResponse} from '@/storybook/mocks/api'

const PAGE_SIZE = 20
const TOTAL_ARTICLES = 60
const queryArguments: NewsArticlesQueryArgs = {
  type: 'article',
  page_size: PAGE_SIZE,
}

const createFailureLoader = (failedPage: number) => async () => {
  const dispatch = store.dispatch as ReduxDispatch
  let hasFailed = false

  setNextResponse<{page: number}, NewsArticlesResponse>(({params}) => {
    if (params.page === failedPage && !hasFailed) {
      hasFailed = true

      // A 404 bypasses automatic API retries so recovery requires a click.
      return {
        status: 404,
        error: {status: 404, data: {detail: 'Simulated news request failure'}},
      }
    }

    return {
      status: 200,
      data: {
        _links: {
          next: {href: ''},
          previous: {href: ''},
          self: {href: ''},
        },
        page: {
          number: params.page,
          size: PAGE_SIZE,
          totalElements: TOTAL_ARTICLES,
          totalPages: TOTAL_ARTICLES / PAGE_SIZE,
        },
        result: Array.from({length: PAGE_SIZE}, (_, index) => {
          const articleNumber = (params.page - 1) * PAGE_SIZE + index + 1

          return {
            id: articleNumber,
            images: [],
            modification_datetime: '2026-11-26T10:00:00Z',
            publication_datetime: '2026-11-26T10:00:00Z',
            title: `Nieuwsbericht ${articleNumber}`,
          }
        }),
      },
    }
  })
  dispatch(newsApi.util.resetApiState())

  if (failedPage > 1) {
    const firstPageRequest = dispatch(
      newsApi.endpoints[NewsEndpointName.articles].initiate(queryArguments),
    )

    await firstPageRequest
    await dispatch(
      newsApi.endpoints[NewsEndpointName.articles].initiate(queryArguments, {
        direction: 'forward',
        subscribe: false,
      }),
    )
    firstPageRequest.unsubscribe()
  }

  return {}
}

const meta = {
  component: NewsList,
  args: {type: 'article'},
  tags: ['!autodocs'],
  parameters: {
    controls: {disable: true},
  },
} satisfies Meta<typeof NewsList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  loaders: [createFailureLoader(0)],
}

export const InitialLoadFailure: Story = {
  loaders: [createFailureLoader(1)],
}

export const NextPageFailure: Story = {
  loaders: [createFailureLoader(2)],
}
