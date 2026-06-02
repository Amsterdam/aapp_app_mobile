import {NavigationButton} from '@/components/ui/buttons/NavigationButton'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Title} from '@/components/ui/text/Title'
import {useNewsArticlesQuery} from '@/modules/news/service'

export const NewsDashboardHighlightedArticle = () => {
  const {
    isError,
    isLoading,
    data: highlights,
  } = useNewsArticlesQuery({type: 'highlight'})

  if (isLoading) {
    return <PleaseWait testID="NewsDashboardHighlightedArticlePleaseWait" />
  }

  if (isError) {
    return (
      <SomethingWentWrong testID="NewsDashboardHighlightedArticleSomethingWentWrong" />
    )
  }

  if (!highlights?.result.length) {
    return null
  }

  // eslint-disable-next-line sonarjs/pseudo-random
  const randomHighlight = Math.floor(Math.random() * highlights.result.length)

  const {images, title} = highlights.result[randomHighlight]

  return (
    <Box>
      <Column gutter="md">
        <NavigationButton
          chevronColor="secondary"
          chevronSize="ml"
          color="default"
          horizontallyAlign="start"
          insetHorizontal="no"
          onPress={() => null}
          testID="NewsHighlightsNavigationButton"
          title="Uitgelicht"
          titleLevel="h2"
        />
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
    </Box>
  )
}
