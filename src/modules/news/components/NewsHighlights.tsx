import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {NewsHighlight} from '@/modules/news/components/NewsHighlight'
import {useNewsArticlesInfiniteQuery} from '@/modules/news/service'

export const NewsHighlights = () => {
  const {
    data: highlights,
    isLoading,
    isError,
    startedTimeStamp,
  } = useNewsArticlesInfiniteQuery({type: 'highlight'}, {initialPageParam: 1})

  if (isLoading) {
    return (
      <PleaseWait
        startedTimeStamp={startedTimeStamp}
        testID="NewsHighlightsPleaseWait"
      />
    )
  }

  if (isError || !highlights?.pages[0]?.result.length) {
    return (
      <SomethingWentWrong
        inset="md"
        testID="NewsHighlightsSomethingWentWrong"
      />
    )
  }

  return (
    <Column gutter="md">
      {highlights.pages[0].result.map(highlight => (
        <NewsHighlight
          key={highlight.id}
          {...highlight}
        />
      ))}
    </Column>
  )
}
