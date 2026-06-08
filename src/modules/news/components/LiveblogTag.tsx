import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Tag} from '@/components/ui/text/Tag'
import {LiveblogDot} from '@/modules/news/components/LiveblogDot'

export const LiveblogTag = () => (
  <Tag
    paddingVertical="no"
    testID="LiveblogTag">
    <Row gutter="sm">
      <LiveblogDot />
      <Phrase
        color="warning"
        emphasis="strong"
        variant="small">
        Liveblog
      </Phrase>
    </Row>
  </Tag>
)
