import type {EVSEWithStation} from '@/modules/boat-charging/types'
import type {ComponentProps} from 'react'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {BoatChargingSocketStatusTag} from '@/modules/boat-charging/components/BoatChargingSocketStatusTag'

export const BoatChargingSocketRadioLabel = ({
  name,
  status,
  width,
}: Pick<EVSEWithStation, 'name' | 'status'> & {
  width?: ComponentProps<typeof BoatChargingSocketStatusTag>['width']
}) => (
  <Row gutter="sm">
    <BoatChargingSocketStatusTag
      status={status}
      width={width}
    />
    <Phrase>{name}</Phrase>
  </Row>
)
