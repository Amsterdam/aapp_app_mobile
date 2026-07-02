import type {BoatChargingLocation} from '@/modules/boat-charging/types'

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
  [BoatChargingRouteName.boatChargingGuestEmail]: undefined
  [BoatChargingRouteName.boatChargingGuestEmailConfirm]: undefined
  [BoatChargingRouteName.boatChargingHelp]: undefined
  [BoatChargingRouteName.boatChargingLogin]: undefined
  [BoatChargingRouteName.boatChargingTermsAndConditions]: undefined
}
