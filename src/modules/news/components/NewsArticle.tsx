import {skipToken} from '@reduxjs/toolkit/query'
import type {NewsArticleBase} from '@/modules/news/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {useNewsArticleQuery} from '@/modules/news/service'

type Props = {
  id: NewsArticleBase['id']
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
      content={article?.content}
      testID="NewsArticleContent"
    />
    // TODO: Add "Lees ook" section when endpoint is available
  )
}
