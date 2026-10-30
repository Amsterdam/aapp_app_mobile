import {Row} from '@/components/ui/layout/Row'
import {MenuHeaderButton} from '@/components/ui/menus/MenuHeaderButton'
import {BoatChargingMapViewSwitchHeaderButton} from '@/modules/boat-charging/components/header/BoatChargingMapViewSwitchHeaderButton'

export const BoatChargingHeaderButtons = () => (
  <Row gutter="md">
    <MenuHeaderButton testID="BoatChargingMenuHeaderButton" />
    <BoatChargingMapViewSwitchHeaderButton />
  </Row>
)
