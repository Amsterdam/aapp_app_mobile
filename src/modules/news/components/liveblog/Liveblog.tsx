import {FlatList} from 'react-native'
import type {NewsArticleBase} from '@/modules/news/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {LiveblogHeader} from '@/modules/news/components/liveblog/LiveblogHeader'
import {LiveblogItem} from '@/modules/news/components/liveblog/LiveblogItem'
import {LiveblogItemSeparator} from '@/modules/news/components/liveblog/LiveblogItemSeparator'
import {useLiveblog} from '@/modules/news/hooks/useLiveblog'

export const Liveblog = ({id}: {id: NewsArticleBase['id']}) => {
  const {data, isError, isLoading, ...rest} = useLiveblog(id)

  if (isLoading) {
    return <PleaseWait testID="LiveblogPleaseWait" />
  }

  if (isError || !data) {
    return <SomethingWentWrong testID="LiveblogSomethingWentWrong" />
  }

  return (
    <FlatList
      data={data.liveblog_items}
      ItemSeparatorComponent={LiveblogItemSeparator}
      ListHeaderComponent={
        <LiveblogHeader
          data={data}
          {...rest}
        />
      }
      renderItem={LiveblogItem}
    />
  )
}
