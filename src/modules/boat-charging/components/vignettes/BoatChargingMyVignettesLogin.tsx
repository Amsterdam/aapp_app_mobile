import {BoatChargingLoginRegister} from '@/modules/boat-charging/components/BoatChargingLoginRegister'
import {BoatChargingRouteName} from '@/modules/boat-charging/routes'

export const BoatChargingMyVignettesLogin = () => (
  <BoatChargingLoginRegister
    pendingScreen={[BoatChargingRouteName.myVignettes]}
    text="Hier ziet u de vignetten die u heeft opgeslagen."
    title="Log in voor uw vignetten"
  />
)
