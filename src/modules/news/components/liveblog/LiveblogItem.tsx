import type {LiveblogResponse} from '@/modules/news/types'
import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

type Props = {
  item: LiveblogResponse['liveblog_items'][number]
}

export const LiveblogItem = ({
  item: {creation_datetime, title, body},
}: Props) => (
  <Column gutter="md">
    <Phrase
      // TODO: this is semanticly not correct and might give problems when implementing dark-mode, this is pending for more information from design
      color="warning"
      emphasis="strong"
      variant="small">
      {formatTimeToDisplay(creation_datetime, {includeHoursLabel: true})}
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
