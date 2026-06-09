import {skipToken} from '@reduxjs/toolkit/query'
import {useMemo} from 'react'
import {FlatList} from 'react-native'
import type {LiveblogResponse} from '@/modules/news/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {LiveblogHeader} from '@/modules/news/components/liveblog/LiveblogHeader'
import {LiveblogItem} from '@/modules/news/components/liveblog/LiveblogItem'
import {LiveblogItemSeparator} from '@/modules/news/components/liveblog/LiveblogItemSeparator'
import {useNewsLiveblogQuery} from '@/modules/news/service'
import {dayjs} from '@/utils/datetime/dayjs'

const getMockItems = (liveblog?: LiveblogResponse) =>
  (
    Array.from({length: 10}).fill({
      body: liveblog?.intro,
      creation_datetime: liveblog?.publication_datetime,
      id: 1,
      images: liveblog?.images,
      message_order: 1,
      title: 'Brand vrachtschip Westelijk uit',
    }) as LiveblogResponse['liveblog_items'][number][]
  ).map((item, index) => ({
    ...item,
    id: item.id + index,
    creation_datetime: dayjs(item.creation_datetime)
      .add(index * 10, 'minute')
      .toISOString(),
    message_order: item.message_order + index,
    title: `${item.title} ${index + 1}`,
  }))

export const Liveblog = ({id}: {id: LiveblogResponse['id']}) => {
  const {
    data: liveblog,
    isError,
    isLoading,
  } = useNewsLiveblogQuery(id ?? skipToken)

  const sortedItems = useMemo(() => {
    const items = liveblog?.liveblog_items?.length
      ? liveblog?.liveblog_items
      : getMockItems(liveblog)

    return items.sort((a, b) =>
      dayjs(a.creation_datetime).isBefore(b.creation_datetime) ? 1 : -1,
    )
  }, [liveblog])

  if (isLoading) {
    return <PleaseWait testID="LiveblogPleaseWait" />
  }

  if (isError || !liveblog) {
    return <SomethingWentWrong testID="LiveblogSomethingWentWrong" />
  }

  return (
    <FlatList
      data={sortedItems}
      ItemSeparatorComponent={LiveblogItemSeparator}
      ListHeaderComponent={<LiveblogHeader id={id} />}
      renderItem={LiveblogItem}
    />
  )
}
