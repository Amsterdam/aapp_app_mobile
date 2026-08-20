import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  details?: string
  label: string | number
  value: string | number
}

export const BoatChargingHistorySessionCostDetailsInfoRow = ({
  label,
  details,
  value,
}: Props) => (
  <SingleSelectable testID="BoatChargingHistorySessionCostDetailsInfoRow">
    <Column>
      <Row
        flex={1}
        gutter="sm">
        <Row flex={1}>
          <Phrase accessible={false}>{label}</Phrase>
        </Row>
        <Phrase
          accessible={false}
          emphasis="strong">
          {value}
        </Phrase>
      </Row>
      {!!details && (
        <Phrase
          accessible={false}
          color="secondary">
          {details}
        </Phrase>
      )}
    </Column>
  </SingleSelectable>
)
