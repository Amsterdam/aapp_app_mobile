import type {NewsArticleSummary} from '@/modules/news/types'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Phrase} from '@/components/ui/text/Phrase'
import {formatDateToDisplay} from '@/utils/datetime/formatDateToDisplay'

type Props = NewsArticleSummary

export const NewsListItem = ({
  id,
  images,
  publication_datetime,
  title,
}: Props) => (
  <Row gutter="smd">
    <LazyImage
      source={images}
      testID={`NewsListItem${id}Image`}
      width={100}
    />
    <Column>
      <Phrase variant="small">{title}</Phrase>
      <Phrase
        color="secondary"
        variant="small">
        {formatDateToDisplay(publication_datetime, false, false)}
      </Phrase>
    </Column>
  </Row>
)
