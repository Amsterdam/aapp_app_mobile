import {BoatChargingLoginRegister} from '@/modules/boat-charging/components/BoatChargingLoginRegister'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

export const BoatChargingHistoryLogin = () => (
  <BoatChargingLoginRegister
    pendingScreen={[BoatChargingRouteName.history]}
    text="Overzicht van uw laadsessies en kosten."
    title="Log in voor uw laadgeschiedenis"
  />
)
