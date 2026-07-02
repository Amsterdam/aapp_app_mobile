import type {ChargingStation} from '@/modules/boat-charging/types'
import type {ComponentProps} from 'react'
import {Row} from '@/components/ui/layout/Row'
import {Phrase} from '@/components/ui/text/Phrase'
import {BoatChargingSocketStatusTag} from '@/modules/boat-charging/components/BoatChargingSocketStatusTag'

export const BoatChargingSocketRadioLabel = ({
  id,
  status,
  width,
}: Omit<ChargingStation, 'location_id' | 'evses'> & {
  width?: ComponentProps<typeof BoatChargingSocketStatusTag>['width']
}) => (
  <Row gutter="sm">
    <BoatChargingSocketStatusTag
      status={status}
      width={width}
    />
    <Phrase>{id}</Phrase>
  </Row>
)
