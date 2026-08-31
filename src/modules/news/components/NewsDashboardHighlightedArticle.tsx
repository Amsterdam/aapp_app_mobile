import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {NewsHighlight} from '@/modules/news/components/NewsHighlight'
import {NewsHighlightsNavigationButton} from '@/modules/news/components/NewsHighlightsNavigationButton'
import {useHighlightedArticle} from '@/modules/news/hooks/useHighlightedArticle'

export const NewsDashboardHighlightedArticle = () => {
  const {isError, isLoading, highlightedArticle, startedTimeStamp} =
    useHighlightedArticle()

  if (isLoading) {
    return (
      <PleaseWait
        startedTimeStamp={startedTimeStamp}
        testID="NewsDashboardHighlightedArticlePleaseWait"
      />
    )
  }

  if (isError) {
    return (
      <SomethingWentWrong testID="NewsDashboardHighlightedArticleSomethingWentWrong" />
    )
  }

  if (!highlightedArticle) {
    return null
  }

  return (
    <Column gutter="sm">
      <NewsHighlightsNavigationButton />

      <NewsHighlight {...highlightedArticle} />
    </Column>
  )
}
