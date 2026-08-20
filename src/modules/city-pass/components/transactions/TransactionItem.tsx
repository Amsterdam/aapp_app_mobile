import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'

export type TransactionItemProps = {
  accessibilityLabel: string
  accessible?: boolean
  amountFormatted: string
  description?: string
  id: string
  provider?: string
  title: string
}

export const TransactionItem = ({
  accessible = true,
  accessibilityLabel,
  amountFormatted,
  description,
  title,
  provider,
}: TransactionItemProps) => (
  <Column>
    <Row
      align="between"
      gutter="md">
      <Phrase
        accessible={accessible}
        emphasis="strong"
        testID="CityPassTransactionTitle">
        {title}
      </Phrase>
      <Phrase
        accessibilityLabel={accessibilityLabel}
        accessible={accessible}
        emphasis="strong"
        flexShrink={0}
        testID="CityPassTransactionItemAmountPhrase">
        {amountFormatted}
      </Phrase>
    </Row>
    {!!provider && <Paragraph accessible={accessible}>{provider}</Paragraph>}
    {!!description && (
      <Paragraph accessible={accessible}>{description}</Paragraph>
    )}
  </Column>
)
