import {ShareIconButton} from '@/components/features/ShareIconButton'
import {useNewsArticle} from '@/modules/news/hooks/useNewsArticle'

const BASE_URL = 'https://www.amsterdam.nl/nieuws/'

export const NewsArticleShareIconButton = () => {
  const {article} = useNewsArticle()

  if (!article?.url) {
    return null
  }

  return (
    <ShareIconButton
      baseUrl={BASE_URL}
      exceptionFileName="NewsArticleShareIconButton.tsx"
      testID="NewsArticleShareIconButton"
      url={article?.url}
      urlTitle="Nieuwsbericht"
    />
  )
}
