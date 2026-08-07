import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {NewsListItem} from '@/modules/news/components/NewsListItem'
import {useNewsArticlesInfiniteQuery} from '@/modules/news/service'

export const NewsHighlights = () => {
  const {
    data: highlights,
    isLoading,
    isError,
  } = useNewsArticlesInfiniteQuery({type: 'highlight'}, {initialPageParam: 1})

  if (isLoading) {
    return <PleaseWait testID="NewsHighlightsPleaseWait" />
  }

  if (isError || !highlights?.pages[0]?.result.length) {
    return <SomethingWentWrong testID="NewsHighlightsSomethingWentWrong" />
  }

  return (
    <Column gutter="md">
      {highlights.pages[0].result.map(highlight => (
        <NewsListItem
          includeDate={false}
          key={highlight.id}
          {...highlight}
        />
      ))}
    </Column>
  )
}
