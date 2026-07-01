import type {BoatChargingLocation} from '@/modules/boat-charging/types'

export enum BoatChargingRouteName {
  boatCharging = 'BoatCharging',
  boatChargingDetails = 'BoatChargingDetails',
  boatChargingHelp = 'BoatChargingHelp',
  boatChargingLogin = 'BoatChargingLogin',
}

export type ModuleStackParams = {
  [BoatChargingRouteName.boatCharging]: undefined
  [BoatChargingRouteName.boatChargingDetails]: {id: BoatChargingLocation['id']}
  [BoatChargingRouteName.boatChargingHelp]: undefined
  [BoatChargingRouteName.boatChargingLogin]: undefined
}
