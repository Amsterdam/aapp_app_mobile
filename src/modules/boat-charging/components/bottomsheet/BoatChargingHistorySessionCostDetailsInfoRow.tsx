import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  label: string | number
  meta?: string
  value: string | number
}

export const BoatChargingHistorySessionCostDetailsInfoRow = ({
  label,
  meta,
  value,
}: Props) => (
  <SingleSelectable testID={`BoatChargingHistorySessionCostDetailsInfoRow`}>
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
      {!!meta && (
        <Phrase
          accessible={false}
          color="secondary">
          {meta}
        </Phrase>
      )}
    </Column>
  </SingleSelectable>
)
