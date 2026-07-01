import type {
  BoatChargingLocation,
  ChargingStation,
} from '@/modules/boat-charging/types'

export enum BoatChargingRouteName {
  boatCharging = 'BoatCharging',
  boatChargingDetails = 'BoatChargingDetails',
  boatChargingGuestEmail = 'BoatChargingGuestEmail',
  boatChargingHelp = 'BoatChargingHelp',

  boatChargingLogin = 'BoatChargingLogin',
}

export type ModuleStackParams = {
  [BoatChargingRouteName.boatCharging]: undefined
  [BoatChargingRouteName.boatChargingDetails]: {id: BoatChargingLocation['id']}
  [BoatChargingRouteName.boatChargingGuestEmail]: {
    socketId: ChargingStation['id']
  }
  [BoatChargingRouteName.boatChargingHelp]: undefined
  [BoatChargingRouteName.boatChargingLogin]: undefined
}
