import {
  ParkingHistorySession,
  ParkingSession,
  VisitorParkingSession,
} from '@/modules/parking/types'

export enum ParkingRouteName {
  account = 'ParkingAccount',
  accounts = 'ParkingAccounts',
  addLicensePlate = 'ParkingAddLicensePlate',
  dashboard = 'ParkingDashboard',
  editSession = 'ParkingEditSession',
  forgotAccessCode = 'ParkingForgotAccessCode',
  increaseBalance = 'ParkingIncreaseBalance',
  intro = 'ParkingIntro',
  login = 'ParkingLogin',
  loginSteps = 'ParkingLoginSteps',
  logout = 'ParkingLogout',
  manageVisitor = 'ParkingManageVisitor',
  manageVisitorAdjustTimeBalance = 'ParkingManageVisitorAdjustTimeBalance',
  myLicensePlates = 'ParkingMyLicensePlates',
  parkingActiveSessions = 'ParkingActiveSessions',
  parkingMoneyTransactions = 'ParkingMoneyTransactions',
  parkingPermitZones = 'ParkingPermitZones',
  parkingPlannedSessions = 'ParkingPlannedSessions',
  parkingSession = 'ParkingSession',
  parkingSessionTransactions = 'ParkingSessionTransactions',
  startSession = 'ParkingStartSession',
  visitorEditSession = 'ParkingVisitorEditSession',
}

export type ParkingStackParams = {
  [ParkingRouteName.account]: {reportCode: string} | undefined
  [ParkingRouteName.accounts]: undefined
  [ParkingRouteName.addLicensePlate]: undefined
  [ParkingRouteName.dashboard]:
    | {
        action: 'increase-balance' | 'start-session-and-increase-balance'
        order_id: string
        signature: string
        status: 'EXPIRED' | 'COMPLETED' | 'PENDING' | 'CANCELLED'
      }
    | undefined
  [ParkingRouteName.intro]: undefined
  [ParkingRouteName.login]:
    | {
        pin: string
        reportCode: string
      }
    | undefined
  [ParkingRouteName.logout]: {reportCode: string} | undefined
  [ParkingRouteName.loginSteps]: undefined
  [ParkingRouteName.myLicensePlates]: undefined
  [ParkingRouteName.parkingActiveSessions]: undefined
  [ParkingRouteName.parkingPermitZones]: undefined
  [ParkingRouteName.parkingPlannedSessions]: undefined
  [ParkingRouteName.parkingSession]: {
    parkingSession:
      | ParkingSession
      | VisitorParkingSession
      | ParkingHistorySession
  }
  [ParkingRouteName.parkingSessionTransactions]: undefined
  [ParkingRouteName.parkingMoneyTransactions]: undefined
  [ParkingRouteName.editSession]: {parkingSession: ParkingSession}
  [ParkingRouteName.visitorEditSession]: {parkingSession: ParkingSession}
  [ParkingRouteName.forgotAccessCode]: undefined
  [ParkingRouteName.startSession]:
    | {defaultStartTime?: string; parkingMachineId?: string}
    | undefined
  [ParkingRouteName.increaseBalance]: undefined
  [ParkingRouteName.manageVisitor]: undefined
  [ParkingRouteName.manageVisitorAdjustTimeBalance]:
    | {subtractTime: boolean}
    | undefined
}
