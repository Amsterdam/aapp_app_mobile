import {useCallback} from 'react'
import type {NewsArticleBase} from '@/modules/news/types'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {NewsDashboardHighlightedArticleImage} from '@/modules/news/components/NewsDashboardHighlightedArticleImage'
import {NewsRouteName} from '@/modules/news/routes'

type Props = NewsArticleBase

export const NewsHighlight = ({
  is_active_liveblog,
  is_liveblog,
  id,
  title,
  images,
}: Props) => {
  const {navigate} = useNavigation()
  const navigateTo = useCallback(() => {
    if (is_liveblog) {
      return navigate(NewsRouteName.liveblog, {
        id,
      })
    }

    return navigate(NewsRouteName.article, {id})
  }, [id, is_liveblog, navigate])

  return (
    <Pressable
      accessibilityLabel={`Uitgelicht artikel: ${title}`}
      onPress={navigateTo}
      testID={`NewsDashboardHighlightedArticle${id}Button`}>
      <Column gutter="smd">
        <NewsDashboardHighlightedArticleImage
          isLiveblog={is_active_liveblog}
          source={images}
        />
        <Title
          accessible={false}
          level="h3"
          text={title}
        />
      </Column>
    </Pressable>
  )
}
