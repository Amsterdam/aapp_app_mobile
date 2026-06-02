import {useState, useCallback} from 'react'
import {FlatList, type FlatListProps} from 'react-native'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {NewsListItem} from '@/modules/news/components/NewsListItem'
import {newsApi, useNewsArticlesQuery} from '@/modules/news/service'
import {
  NewsEndpointName,
  type NewsArticleBase,
  type NewsArticlesQueryArgs,
  type NewsArticlesType,
} from '@/modules/news/types'

type Props = NewsArticlesType & {
  footerComponent?: FlatListProps<NewsArticleBase>['ListFooterComponent']
  headerComponent?: FlatListProps<NewsArticleBase>['ListHeaderComponent']
}

const PAGE_SIZE = 20

const emptyNewsItem: NewsArticleBase = {
  id: -1,
  images: [],
  modification_datetime: '',
  publication_datetime: '',
  title: '',
}

export const NewsList = ({
  footerComponent,
  headerComponent,
  type,
  district,
}: Props) => {
  const [page, setPage] = useState(1)

  const params: NewsArticlesType =
    type === 'district' ? {type, district} : {type}

  const result = useInfiniteScroller<
    NewsArticleBase,
    NewsArticleBase,
    NewsArticlesQueryArgs
  >(
    emptyNewsItem,
    newsApi.endpoints[NewsEndpointName.articles],
    'id',
    useNewsArticlesQuery,
    page,
    PAGE_SIZE,
    {
      page_size: PAGE_SIZE,
      ...params,
    },
  )

  const onViewableItemsChanged = useCallback<
    NonNullable<
      FlatListProps<NewsArticleBase & {page: number}>['onViewableItemsChanged']
    >
  >(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const middleIndex = Math.floor(viewableItems.length / 2)
      const foundPage = viewableItems[middleIndex].item.page

      if (foundPage) {
        setPage(foundPage)
      }
    }
  }, [])

  return (
    <FlatList
      data={result.data ?? []}
      ItemSeparatorComponent={<Gutter height="md" />}
      ListFooterComponent={footerComponent}
      ListHeaderComponent={headerComponent}
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={({item}) => <NewsListItem {...item} />}
    />
  )
}
