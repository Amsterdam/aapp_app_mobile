import type {EVSEWithStation} from '@/modules/boat-charging/types'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {BoatChargingSocketStatusTag} from '@/modules/boat-charging/components/BoatChargingSocketStatusTag'

type Props = {disabled?: boolean} & Pick<EVSEWithStation, 'name' | 'status'>

export const BoatChargingSocketRadioLabel = ({
  name,
  status,
  disabled,
}: Props) => (
  <Row gutter="sm">
    <BoatChargingSocketStatusTag status={status} />
    <Phrase color={disabled ? 'secondary' : 'default'}>{name}</Phrase>
  </Row>
)
