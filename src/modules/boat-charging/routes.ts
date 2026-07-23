import type {
  BoatChargingLocation,
  BoatChargingSession,
} from '@/modules/boat-charging/types'

export enum BoatChargingRouteName {
  boatCharging = 'BoatCharging',
  boatChargingActiveSessionDetails = 'BoatChargingActiveSessionDetails',
  boatChargingGuestEmail = 'BoatChargingGuestEmail',
  boatChargingGuestEmailConfirm = 'BoatChargingGuestEmailConfirm',
  boatChargingHelp = 'BoatChargingHelp',
  boatChargingHistory = 'BoatChargingHistory',
  boatChargingHistorySessionDetails = 'BoatChargingHistorySessionDetails',
  boatChargingLocationDetails = 'BoatChargingLocationDetails',
  boatChargingLogin = 'BoatChargingLogin',
  boatChargingTermsAndConditions = 'BoatChargingTermsAndConditions',
}

export type ModuleStackParams = {
  [BoatChargingRouteName.boatCharging]: undefined
  [BoatChargingRouteName.boatChargingLocationDetails]: {
    id: BoatChargingLocation['id']
  }
  [BoatChargingRouteName.boatChargingGuestEmail]: undefined
  [BoatChargingRouteName.boatChargingGuestEmailConfirm]: undefined
  [BoatChargingRouteName.boatChargingHelp]: undefined
  [BoatChargingRouteName.boatChargingHistory]: undefined
  [BoatChargingRouteName.boatChargingLogin]: undefined
  [BoatChargingRouteName.boatChargingActiveSessionDetails]: {
    id: BoatChargingSession['id']
  }
  [BoatChargingRouteName.boatChargingHistorySessionDetails]: {
    id: BoatChargingSession['id']
  }
  [BoatChargingRouteName.boatChargingTermsAndConditions]: undefined
}
