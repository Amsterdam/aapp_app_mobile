import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {Tag} from '@/components/ui/text/Tag'
import {LiveblogDot} from '@/modules/news/components/liveblog/LiveblogDot'

type Props = {
  variant?: 'default' | 'transparent'
}

export const LiveblogTag = ({variant = 'default'}: Props) => (
  <Tag
    paddingVertical="no"
    testID="LiveblogTag"
    variant={variant}>
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
