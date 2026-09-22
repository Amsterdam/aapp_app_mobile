import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {TestProps} from '@/components/ui/types'

type Props = {
  text: string
} & TestProps

export const ErrorMessage = ({text, testID}: Props) => (
  <Row gutter="sm">
    <Icon
      color="negative"
      name="warning"
      size="md"
      testID={`${testID}Icon`}
    />
    <Paragraph
      color="negative"
      testID={testID}>
      {text}
    </Paragraph>
  </Row>
)
