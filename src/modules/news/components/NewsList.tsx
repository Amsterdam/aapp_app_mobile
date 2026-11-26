import {useState, useCallback} from 'react'
import {FlatList, StyleSheet, type FlatListProps} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Gutter} from '@/components/ui/layout/Gutter'
import {useInfiniteScroller} from '@/hooks/useInfiniteScroller'
import {NewsListItem} from '@/modules/news/components/NewsListItem'
import {newsApi} from '@/modules/news/service'
import {
  NewsEndpointName,
  type NewsArticleBase,
  type NewsArticlesQueryArgs,
  type NewsArticlesType,
} from '@/modules/news/types'
import type {WithDummy} from '@/services/types'
import type {Theme} from '@/themes/themes'
import {useThemable} from '@/themes/useThemable'

type Props = NewsArticlesType & {
  footerComponent?: FlatListProps<NewsArticleBase>['ListFooterComponent']
  headerComponent?: FlatListProps<NewsArticleBase>['ListHeaderComponent']
}

const PAGE_SIZE = 20

const emptyNewsItem: WithDummy<NewsArticleBase> = {
  id: -1,
  images: [],
  modification_datetime: '',
  publication_datetime: '',
  title: '',
  dummy: true,
}

export const NewsList = ({
  footerComponent,
  headerComponent,
  type,
  district,
}: Props) => {
  const [page, setPage] = useState(1)
  const styles = useThemable(createStyles)

  const params: NewsArticlesType =
    type === 'district' ? {type, district} : {type}

  const result = useInfiniteScroller<NewsArticleBase, NewsArticlesQueryArgs>(
    emptyNewsItem,
    newsApi.endpoints[NewsEndpointName.articles],
    'id',
    page,
    PAGE_SIZE,
    {
      page_size: PAGE_SIZE,
      ...params,
    },
  )
  const data = result.isError
    ? result.data.filter(item => !item.dummy)
    : result.data

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
      contentContainerStyle={styles.contentContainer}
      data={data ?? []}
      ItemSeparatorComponent={<Gutter height="md" />}
      ListEmptyComponent={
        result.isLoading ? (
          <PleaseWait
            showFeedback
            testID="NewsListPleaseWait"
          />
        ) : result.isError ? (
          <SomethingWentWrong
            retryFn={result.retry}
            testID="NewsListSomethingWentWrong"
          />
        ) : null
      }
      ListFooterComponent={footerComponent}
      ListHeaderComponent={headerComponent}
      onViewableItemsChanged={onViewableItemsChanged}
      renderItem={({item, index}) =>
        result.isError && index === data.length - 1 ? (
          // Show an error message at the bottom of the scroll, with an option to retry, so successfully retrieved data in de list can still be viewed
          <Column gutter="md">
            <NewsListItem {...item} />

            <Box insetHorizontal="md">
              <SomethingWentWrong
                retryFn={result.retry}
                testID="NewsListSomethingWentWrong"
              />
            </Box>
          </Column>
        ) : (
          <NewsListItem {...item} />
        )
      }
    />
  )
}

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    contentContainer: {
      paddingBottom: size.spacing.md,
    },
  })
