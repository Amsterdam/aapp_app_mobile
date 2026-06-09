import type {LiveblogResponse} from '@/modules/news/types'
import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {dayjs} from '@/utils/datetime/dayjs'

export const LiveblogItem = ({
  item: {id, creation_datetime, title, body},
}: {
  item: LiveblogResponse['liveblog_items'][number]
}) => (
  <Column
    gutter="md"
    key={id}>
    <Phrase
      color="warning"
      emphasis="strong"
      variant="small">
      {dayjs(creation_datetime).format('HH.mm')} uur
    </Phrase>
    <Title
      level="h5"
      text={title}
    />
    <HtmlContent
      content={body}
      testID="LiveblogContent"
    />
  </Column>
)
