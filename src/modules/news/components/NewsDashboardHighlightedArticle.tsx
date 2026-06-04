import {Pressable} from '@/components/ui/buttons/Pressable'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {NewsHighlightsNavigationButton} from '@/modules/news/components/NewsHighlightsNavigationButton'
import {useHighlightedArticle} from '@/modules/news/hooks/useHighlightedArticle'
import {NewsRouteName} from '@/modules/news/routes'

export const NewsDashboardHighlightedArticle = () => {
  const {isError, isLoading, highlightedArticle} = useHighlightedArticle()
  const {navigate} = useNavigation()

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

  const {images, title, id} = highlightedArticle

  return (
    <Column gutter="md">
      <NewsHighlightsNavigationButton />

      <Pressable
        accessibilityLabel={`Uitgelicht artikel: ${title}`}
        onPress={() => navigate(NewsRouteName.article, {id})}
        testID={`NewsDashboardHighlightedArticle${id}Button`}>
        <Column gutter="smd">
          <LazyImage
            aspectRatio="wide"
            fallbackInheritsAspectRatio
            source={images}
            testID="NewsHighlightsLazyImage"
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
