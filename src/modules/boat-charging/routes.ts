import type {
  BoatChargingLocation,
  BoatChargingSession,
  BoatChargingPaymentResultStatus,
  Vignet,
} from '@/modules/boat-charging/types'

export enum BoatChargingRouteName {
  activeSessionDetails = 'BoatChargingActiveSessionDetails',
  confirmSession = 'BoatChargingConfirmSession',
  createAccount = 'BoatChargingCreateAccount',
  createAccountConfirm = 'BoatChargingCreateAccountConfirm',
  forgotAccessCode = 'BoatChargingForgotAccessCode',
  guestEmail = 'BoatChargingGuestEmail',
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
  verifyVignet = 'BoatChargingVerifyVignet',
  vignet = 'BoatChargingVignet',
}

export type ModuleStackParams = {
  [BoatChargingRouteName.map]: undefined
  [BoatChargingRouteName.locationDetails]: {
    id: BoatChargingLocation['id']
  }
  [BoatChargingRouteName.guestEmail]: undefined
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
  [BoatChargingRouteName.confirmSession]: undefined
  [BoatChargingRouteName.myVignettes]: undefined
  [BoatChargingRouteName.vignet]: undefined | {vignetId: Vignet['id']}
  [BoatChargingRouteName.verifyVignet]: undefined
  [BoatChargingRouteName.createAccount]: undefined
  [BoatChargingRouteName.createAccountConfirm]: undefined
}
