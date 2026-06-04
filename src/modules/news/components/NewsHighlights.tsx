import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {NewsListItem} from '@/modules/news/components/NewsListItem'
import {useNewsArticlesQuery} from '@/modules/news/service'

export const NewsHighlights = () => {
  const {
    data: highlights,
    isLoading,
    isError,
  } = useNewsArticlesQuery({type: 'highlight'})

  if (isLoading) {
    return <PleaseWait testID="NewsHighlightsPleaseWait" />
  }

  if (isError || !highlights?.result.length) {
    return <SomethingWentWrong testID="NewsHighlightsSomethingWentWrong" />
  }

  return (
    <Column gutter="md">
      {highlights.result.map(highlight => (
        <NewsListItem
          includeDate={false}
          key={highlight.id}
          {...highlight}
        />
      ))}
    </Column>
  )
}
