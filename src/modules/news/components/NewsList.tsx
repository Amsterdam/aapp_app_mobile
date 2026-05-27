import {FlatList} from 'react-native'
import type {ArticlesType, ArticleSummary} from '@/modules/news/types'
import {NewsListItem} from '@/modules/news/components/NewsListItem'

type Props = ArticlesType

export const NewsList = ({}: Props) => (
  <FlatList
    data={[] as ArticleSummary[]}
    renderItem={({item}) => <NewsListItem {...item} />}
  />
)
