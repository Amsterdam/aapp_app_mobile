import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {LiveblogDot} from '@/modules/news/components/LiveblogDot'

export const ActiveLiveblogHeaderTitle = () => (
  <Row gutter="sm">
    <LiveblogDot />
    <Phrase emphasis="strong">Liveblog</Phrase>
  </Row>
)
