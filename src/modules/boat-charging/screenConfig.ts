import {StackNavigationRoutes} from '@/app/navigation/types'
import {
  type BoatChargingStackParams,
  BoatChargingRouteName,
} from '@/modules/boat-charging/routes'
import {BoatChargingScreen} from '@/modules/boat-charging/screens/BoatCharging.screen'
import {BoatChargingDetailsScreen} from '@/modules/boat-charging/screens/BoatChargingDetails.screen'

export const screenConfig: StackNavigationRoutes<
  BoatChargingStackParams,
  BoatChargingRouteName
> = {
  [BoatChargingRouteName.boatCharging]: {
    component: BoatChargingScreen,
    name: BoatChargingRouteName.boatCharging,
    options: {
      headerTitle: 'Boot laden',
      headerShown: false,
    },
  },
  [BoatChargingRouteName.boatChargingDetails]: {
    component: BoatChargingDetailsScreen,
    name: BoatChargingRouteName.boatChargingDetails,
    options: {
      headerTitle: 'Opladen starten',
    },
  },
}
