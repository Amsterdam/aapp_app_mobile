import type {
  BoatChargingLocation,
  ChargingStation,
} from '@/modules/boat-charging/types'

export enum BoatChargingRouteName {
  boatCharging = 'BoatCharging',
  boatChargingDetails = 'BoatChargingDetails',
  boatChargingGuestEmail = 'BoatChargingGuestEmail',
  boatChargingGuestEmailConfirm = 'BoatChargingGuestEmailConfirm',
  boatChargingHelp = 'BoatChargingHelp',
  boatChargingLogin = 'BoatChargingLogin',
  boatChargingTermsAndConditions = 'BoatChargingTermsAndConditions',
}

export type ModuleStackParams = {
  [BoatChargingRouteName.boatCharging]: undefined
  [BoatChargingRouteName.boatChargingDetails]: {id: BoatChargingLocation['id']}
  [BoatChargingRouteName.boatChargingGuestEmail]: {
    socketId: ChargingStation['id']
  }
  [BoatChargingRouteName.boatChargingGuestEmailConfirm]: {
    email: string
    socketId: ChargingStation['id']
  }
  [BoatChargingRouteName.boatChargingHelp]: undefined
  [BoatChargingRouteName.boatChargingLogin]: undefined
  [BoatChargingRouteName.boatChargingTermsAndConditions]: {
    email: string
    socketId: ChargingStation['id']
  }
}
