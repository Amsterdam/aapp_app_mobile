import type {
  BoatChargingLocation,
  BoatChargingSession,
  BoatChargingPaymentResultStatus,
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
  paymentResult = 'BoatChargingPaymentResult',
  termsAndConditions = 'BoatChargingTermsAndConditions',
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
}
