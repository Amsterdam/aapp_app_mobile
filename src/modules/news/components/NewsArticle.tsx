import type {NewsArticleBase} from '@/modules/news/types'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useNewsArticle} from '@/modules/news/hooks/useNewsArticle'
import {dayjs} from '@/utils/datetime/dayjs'

type Props = {
  id: NewsArticleBase['id']
}

export const NewsArticle = ({id}: Props) => {
  const {article, isLoading, isError} = useNewsArticle()

  if (isLoading) {
    return <PleaseWait testID="NewsArticlePleaseWait" />
  }

  if (isError || !article) {
    return <SomethingWentWrong testID="NewsArticleSomethingWentWrong" />
  }

  const {body, images, publication_datetime, title, intro} = article

  return (
    <Column gutter="md">
      <Column gutter="sm">
        <Title
          testID="NewsArticleTitle"
          text={title}
        />
        <Phrase color="secondary">{`${dayjs(publication_datetime).format('DD MMMM, HH.mm')} uur`}</Phrase>
      </Column>
      <LazyImage
        aspectRatio="wide"
        openInImageViewer
        source={images}
        testID={`NewsArticle${id}Image`}
      />
      <Column gutter="no">
        {!!intro && (
          <HtmlContent
            content={intro}
            testID="NewsArticleIntroHtmlContent"
          />
        )}
        <HtmlContent
          content={body}
          testID="NewsArticleBodyHtmlContent"
        />
      </Column>
    </Column>
  )
}
