import type {LiveblogItem as LiveblogItemType} from '@/modules/news/types'
import {Column} from '@/components/ui/layout/Column'
import {HtmlContent} from '@/components/ui/text/HtmlContent'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {formatDayToDisplay} from '@/utils/datetime/formatDayToDisplay'
import {formatTimeToDisplay} from '@/utils/datetime/formatTimeToDisplay'

type Props = {
  isLastEntryOfDay: boolean
  item: LiveblogItemType
}

export const LiveblogItem = ({
  item: {creation_datetime, title, body},
  isLastEntryOfDay,
}: Props) => (
  <Column gutter="md">
    {!!isLastEntryOfDay && (
      <Phrase
        color="secondary"
        emphasis="strong"
        variant="small">
        {formatDayToDisplay(creation_datetime)}
      </Phrase>
    )}
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
