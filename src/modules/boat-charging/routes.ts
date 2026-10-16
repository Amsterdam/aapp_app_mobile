import type {
  BoatChargingLocation,
  BoatChargingSession,
  BoatChargingPaymentResultStatus,
  Vignet,
} from '@/modules/boat-charging/types'

export enum BoatChargingRouteName {
  activeSessionDetails = 'BoatChargingActiveSessionDetails',
  forgotAccessCode = 'BoatChargingForgotAccessCode',
  guestEmail = 'BoatChargingGuestEmail',
  guestEmailConfirm = 'BoatChargingGuestEmailConfirm',
  help = 'BoatChargingHelp',
  history = 'BoatChargingHistory',
  historySessionDetails = 'BoatChargingHistorySessionDetails',
  locationDetails = 'BoatChargingLocationDetails',
  login = 'BoatChargingLogin',
  loginSteps = 'BoatChargingLoginSteps',
  map = 'BoatChargingMap',
  myVignettes = 'BoatChargingMyVignettes',
  paymentResult = 'BoatChargingPaymentResult',
  termsAndConditions = 'BoatChargingTermsAndConditions',
  vignet = 'BoatChargingVignet',
}

export type ModuleStackParams = {
  [BoatChargingRouteName.map]: undefined
  [BoatChargingRouteName.locationDetails]: {
    id: BoatChargingLocation['id']
  }
  [BoatChargingRouteName.guestEmail]: undefined
  [BoatChargingRouteName.guestEmailConfirm]: undefined
  [BoatChargingRouteName.help]: undefined
  [BoatChargingRouteName.history]: undefined
  [BoatChargingRouteName.login]: undefined
  [BoatChargingRouteName.activeSessionDetails]: {
    id: BoatChargingSession['id']
  }
  [BoatChargingRouteName.historySessionDetails]: {
    id: BoatChargingSession['id']
  }
  [BoatChargingRouteName.termsAndConditions]: undefined
  [BoatChargingRouteName.paymentResult]: {
    paymentStatus: BoatChargingPaymentResultStatus
    sessionId: BoatChargingSession['id']
  }
  [BoatChargingRouteName.myVignettes]: undefined
  [BoatChargingRouteName.vignet]: undefined | {vignetId: Vignet['id']}
}
