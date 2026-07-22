import type {BoatChargingLocation} from '@/modules/boat-charging/types'

export enum BoatChargingRouteName {
  boatCharging = 'BoatCharging',
  boatChargingDetails = 'BoatChargingDetails',
  boatChargingGuestEmail = 'BoatChargingGuestEmail',
  boatChargingGuestEmailConfirm = 'BoatChargingGuestEmailConfirm',
  boatChargingHelp = 'BoatChargingHelp',
  boatChargingHistory = 'BoatChargingHistory',
  boatChargingLogin = 'BoatChargingLogin',
  boatChargingSession = 'BoatChargingSession',
  boatChargingTermsAndConditions = 'BoatChargingTermsAndConditions',
}

export type ModuleStackParams = {
  [BoatChargingRouteName.boatCharging]: undefined
  [BoatChargingRouteName.boatChargingDetails]: {id: BoatChargingLocation['id']}
  [BoatChargingRouteName.boatChargingGuestEmail]: undefined
  [BoatChargingRouteName.boatChargingGuestEmailConfirm]: undefined
  [BoatChargingRouteName.boatChargingHelp]: undefined
  [BoatChargingRouteName.boatChargingHistory]: undefined
  [BoatChargingRouteName.boatChargingLogin]: undefined
  [BoatChargingRouteName.boatChargingSession]: undefined
  [BoatChargingRouteName.boatChargingTermsAndConditions]: undefined
}
