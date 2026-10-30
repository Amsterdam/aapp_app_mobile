import {Row} from '@/components/ui/layout/Row'
import {Size} from '@/components/ui/layout/Size'
import {Icon} from '@/components/ui/media/Icon'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {TestProps} from '@/components/ui/types'
import {textTokens, type ParagraphVariants} from '@/themes/tokens/text'

const SIZE_VARIANT_MAP = {small: 'smd', body: 'md'} as const

type Props = {
  text: string
  variant?: Extract<ParagraphVariants, 'small' | 'body'>
} & TestProps

export const ErrorMessage = ({text, testID, variant = 'body'}: Props) => (
  <Row
    gutter="sm"
    valign="start">
    <Size
      height={textTokens.lineHeight[variant]}
      valign="center">
      <Icon
        color="negative"
        name="warning"
        size={SIZE_VARIANT_MAP[variant]}
        testID={`${testID}Icon`}
      />
    </Size>
    <Paragraph
      color="negative"
      testID={testID}
      variant={variant}>
      {text}
    </Paragraph>
  </Row>
)
