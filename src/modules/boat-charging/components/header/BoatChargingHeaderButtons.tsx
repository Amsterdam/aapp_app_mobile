import {Row} from '@/components/ui/layout/Row'
import {BoatChargingHeaderButton} from '@/modules/boat-charging/components/header/BoatChargingHeaderButton'
import {BoatChargingHistoryHeaderButton} from '@/modules/boat-charging/components/header/BoatChargingHistoryHeaderButton'

export const BoatChargingHeaderButtons = () => (
  <Row gutter="md">
    <BoatChargingHistoryHeaderButton />
    <BoatChargingHeaderButton />
  </Row>
)
