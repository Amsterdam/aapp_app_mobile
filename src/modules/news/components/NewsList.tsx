import {FlatList} from 'react-native'
import type {NewsArticlesType, NewsArticleSummary} from '@/modules/news/types'
import {NewsListItem} from '@/modules/news/components/NewsListItem'

type Props = NewsArticlesType

export const NewsList = ({}: Props) => (
  <FlatList
    data={[] as NewsArticleSummary[]}
    renderItem={({item}) => <NewsListItem {...item} />}
  />
)
