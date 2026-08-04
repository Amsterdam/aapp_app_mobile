import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'

type Props = {
  label: string | number
  value: string | number
}

export const BottomSheetLabelValueRow = ({label, value}: Props) => (
  <SingleSelectable>
    <Row
      flex={1}
      gutter="sm">
      <Row flex={1}>
        <Phrase accessible={false}>{label}</Phrase>
      </Row>
      <Row flex={1}>
        <Phrase
          accessible={false}
          emphasis="strong">
          {value}
        </Phrase>
      </Row>
    </Row>
  </SingleSelectable>
)
