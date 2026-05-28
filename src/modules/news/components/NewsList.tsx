import {FlatList} from 'react-native'
import type {NewsArticlesType, NewsArticleBase} from '@/modules/news/types'
import {NewsListItem} from '@/modules/news/components/NewsListItem'

type Props = NewsArticlesType

export const NewsList = ({}: Props) => (
  <FlatList
    data={[] as NewsArticleBase[]}
    renderItem={({item}) => <NewsListItem {...item} />}
  />
)
