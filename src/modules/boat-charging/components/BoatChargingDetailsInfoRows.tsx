import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  rows: Array<[string, string | undefined]>
}
export const BoatChargingDetailsInfoRows = ({rows}: Props) => (
  <Column>
    {rows.map(([key, value]) => {
      if (!value) return null

      return (
        <Row
          flex={1}
          key={key}>
          <Column flex={1}>
            <Phrase color="secondary">{key}</Phrase>
          </Column>
          <Column flex={1}>
            <Phrase color="secondary">{value}</Phrase>
          </Column>
        </Row>
      )
    })}
  </Column>
)
