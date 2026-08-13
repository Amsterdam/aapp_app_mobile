import type {EVSEWithStation} from '@/modules/boat-charging/types'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {BoatChargingSocketStatusTag} from '@/modules/boat-charging/components/BoatChargingSocketStatusTag'

export const BoatChargingSocketRadioLabel = ({
  name,
  status,
}: Pick<EVSEWithStation, 'name' | 'status'>) => (
  <Row gutter="sm">
    <BoatChargingSocketStatusTag status={status} />
    <Phrase>{name}</Phrase>
  </Row>
)
