import type {
  BoatChargingLocation,
  BoatChargingSession,
  BoatChargingPaymentResultStatus,
  Vignette,
} from '@/modules/boat-charging/types'

export enum BoatChargingRouteName {
  activeSessionDetails = 'BoatChargingActiveSessionDetails',
  activeSessions = 'BoatChargingActiveSessions',
  chooseVignette = 'BoatChargingChooseVignette',
  confirmSession = 'BoatChargingConfirmSession',
  createAccount = 'BoatChargingCreateAccount',
  createAccountConfirm = 'BoatChargingCreateAccountConfirm',
  forgotAccessCode = 'BoatChargingForgotAccessCode',
  forgotPassword = 'BoatChargingForgotPassword',
  forgotPasswordNewPassword = 'BoatChargingForgotPasswordNewPassword',
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
  verifyVignette = 'BoatChargingVerifyVignette',
  vignette = 'BoatChargingVignette',
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
  [BoatChargingRouteName.activeSessions]: undefined
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
  [BoatChargingRouteName.vignette]: undefined | {vignetteId: Vignette['id']}
  [BoatChargingRouteName.verifyVignette]: undefined
  [BoatChargingRouteName.chooseVignette]: undefined
  [BoatChargingRouteName.createAccount]: undefined
  [BoatChargingRouteName.createAccountConfirm]: undefined
  [BoatChargingRouteName.forgotPassword]: undefined
  [BoatChargingRouteName.forgotPasswordNewPassword]: undefined
}
