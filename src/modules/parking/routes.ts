import {
  ParkingHistorySession,
  ParkingSession,
  VisitorParkingSession,
  type ParkingLicensePlateBase,
  type ParkingLicensePlate,
} from '@/modules/parking/types'

export enum ParkingRouteName {
  account = 'ParkingAccount',
  accountInactive = 'ParkingAccountInactive',
  accounts = 'ParkingAccounts',
  addLicensePlate = 'ParkingAddLicensePlate',
  dashboard = 'ParkingDashboard',
  editLicensePlate = 'ParkingChangeLicensePlate',
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
  visitorExtendSession = 'ParkingVisitorExtendSession',
}

export type ModuleStackParams = {
  [ParkingRouteName.account]: {reportCode: string}
  [ParkingRouteName.accountInactive]: undefined
  [ParkingRouteName.accounts]: undefined
  [ParkingRouteName.addLicensePlate]: undefined
  [ParkingRouteName.editLicensePlate]: {
    licensePlateId: ParkingLicensePlate['id']
  }

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
  [ParkingRouteName.visitorExtendSession]: {parkingSession: ParkingSession}
  [ParkingRouteName.forgotAccessCode]: undefined
  [ParkingRouteName.startSession]:
    | {
        defaultStartTime?: string
        licensePlate?: ParkingLicensePlateBase
        parkingMachineId?: string
      }
    | undefined
  [ParkingRouteName.increaseBalance]: undefined
  [ParkingRouteName.manageVisitor]: undefined
  [ParkingRouteName.manageVisitorAdjustTimeBalance]:
    | {subtractTime: boolean}
    | undefined
}
