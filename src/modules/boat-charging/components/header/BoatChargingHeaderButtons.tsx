import {Row} from '@/components/ui/layout/Row'
import {BoatChargingHistoryHeaderButton} from '@/modules/boat-charging/components/header/BoatChargingHistoryHeaderButton'
import {BoatChargingMapViewSwitchHeaderButton} from '@/modules/boat-charging/components/header/BoatChargingMapViewSwitchHeaderButton'

export const BoatChargingHeaderButtons = () => (
  <Row gutter="md">
    <BoatChargingHistoryHeaderButton />
    <BoatChargingMapViewSwitchHeaderButton />
  </Row>
)
