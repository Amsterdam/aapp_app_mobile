import {useCallback} from 'react'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {NewsDashboardHighlightedArticleImage} from '@/modules/news/components/NewsDashboardHighlightedArticleImage'
import {NewsHighlightsNavigationButton} from '@/modules/news/components/NewsHighlightsNavigationButton'
import {useHighlightedArticle} from '@/modules/news/hooks/useHighlightedArticle'
import {NewsRouteName} from '@/modules/news/routes'

export const NewsDashboardHighlightedArticle = () => {
  const {isError, isLoading, highlightedArticle} = useHighlightedArticle()
  const {navigate} = useNavigation()

  const navigateTo = useCallback(() => {
    if (!highlightedArticle) return

    const {id, type} = highlightedArticle

    if (type === 'liveblog') {
      return navigate(NewsRouteName.liveblog, {id})
    }

    return navigate(NewsRouteName.article, {id})
  }, [highlightedArticle, navigate])

  if (isLoading) {
    return <PleaseWait testID="NewsDashboardHighlightedArticlePleaseWait" />
  }

  if (isError) {
    return (
      <SomethingWentWrong testID="NewsDashboardHighlightedArticleSomethingWentWrong" />
    )
  }

  if (!highlightedArticle) {
    return null
  }

  const {images, title, id, is_active_liveblog} = highlightedArticle

  return (
    <Column gutter="md">
      <NewsHighlightsNavigationButton />

      <Pressable
        accessibilityLabel={`Uitgelicht artikel: ${title}`}
        onPress={() => navigateTo()}
        testID={`NewsDashboardHighlightedArticle${id}Button`}>
        <Column gutter="smd">
          <NewsDashboardHighlightedArticleImage
            isLiveblog={is_active_liveblog}
            source={images}
          />
          <Title
            level="h3"
            text={title}
          />
        </Column>
      </Pressable>
    </Column>
  )
}
