import {BoatChargingLoginRegister} from '@/modules/boat-charging/components/BoatChargingLoginRegister'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

export const BoatChargingHistoryLogin = () => (
  <BoatChargingLoginRegister
    pendingScreen={[BoatChargingRouteName.history]}
    text="Log in om uw laadsessies en de kosten te bekijken."
    title="Bekijk uw laadgeschiedenis"
  />
)
