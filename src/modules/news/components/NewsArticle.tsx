import {skipToken} from '@reduxjs/toolkit/query'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {htmlContent} from '@/modules/news/mockHtml'
import {useNewsArticleQuery} from '@/modules/news/service'

type Props = {
  id: string
}

export const NewsArticle = ({id}: Props) => {
  const {data: article, isLoading, error} = useNewsArticleQuery(id ?? skipToken)

  if (isLoading) {
    return <PleaseWait testID="NewsArticlePleaseWait" />
  }

  if (error || !article) {
    return <SomethingWentWrong testID="NewsArticleSomethingWentWrong" />
  }

  return (
    <HtmlContent
      content={article?.content ?? htmlContent}
      testID="NewsArticleContent"
    />
  )
}
