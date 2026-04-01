import type {EmptyObject} from '@/types/utils'
import type {FeatureCollection} from 'geojson'
import {Paginated, PaginationQueryArgs} from '@/types/api'

// Routes
export enum ParkingEndpointName {
  accountDetails = 'accountDetails',
  activateSession = 'activateSession',
  addLicensePlate = 'addLicensePlate',
  confirmBalance = 'confirmBalance',
  deleteSession = 'deleteSession',
  editSession = 'editSession',
  increaseBalance = 'increaseBalance',
  licensePlates = 'licensePlates',
  login = 'login',
  manageVisitorAddAccount = 'manageVisitorAddAccount',
  manageVisitorRemoveAccount = 'manageVisitorRemoveAccount',
  manageVisitorTimeBalance = 'manageVisitorTimeBalance',
  parkingMachines = 'parkingMachines',
  parkingSessionHistory = 'parkingSessionHistory',
  parkingSessions = 'parkingSessions',
  parkingTransactions = 'parkingTransactions',
  permitZones = 'permitZones',
  permits = 'permits',
  removeLicensePlate = 'removeLicensePlate',
  sessionReceipt = 'sessionReceipt',
  startSession = 'startSession',
  visitorParkingSessions = 'visitorParkingSessions',
  zoneByMachine = 'zoneByMachine',
}

// Account
export type ParkingAccountDetails = {
  wallet?: {
    balance: number | null
    currency: string
  }
}

export enum ParkingPermitScope {
  permitHolder = 'permitHolder',
  visitor = 'visitor',
}

export type ParkingAccountLogin = {
  pin: string
  reportCode: string
}

export type SecureParkingAccount = ParkingAccountLogin & {name?: string}

export type ParkingAccount = {
  permits?: ParkingPermit[]
  reportCode: string
  scope: ParkingPermitScope
}

export type ParkingLoginEndpointRequest = {
  pin: string
  report_code: string
}

export enum ParkingApiVersion {
  v2 = 2,
}

export type ParkingLoginEndpointResponse = {
  access_token: string
  access_token_expiration: string
  scope: ParkingPermitScope
  version: ParkingApiVersion
}

// License-plate
export type ParkingLicensePlate = {
  activated_at?: string
  id: string
  is_future?: boolean
  vehicle_id: string
  visitor_name?: string
}

export type LicensePlatesEndpointRequest = {
  reportCode: string
}

export type LicensePlatesEndpointResponse = ParkingLicensePlate[]

export type AddLicensePlateEndpointRequest = {
  report_code: string
  vehicle_id: string
  visitor_name: string
}

export type AddLicensePlateEndpointResponse = {
  id: string
  report_code: string
  vehicle_id: string
  visitor_name: string
}

export type RemoveLicensePlateEndpointRequest = {
  id: string
  report_code: string
  vehicle_id: string
}

export type RemoveLicensePlateEndpointResponse = {
  report_code: string
  vehicle_id: string
}

export type ActivateLicensePlateEndpointRequest = {
  report_code: string
  vehicle_id: string
}

export type ActivateLicensePlateEndpointResponse = {
  ps_right_id: string
}

export type PaymentZone = {
  city: string
  days: PaymentZoneDay[]
  description: string
  hourly_rate?: string
  id: string
}

export type PaymentZoneDay = {
  day_of_week: string
  end_time: string
  start_time: string
}

export enum PermitType {
  'GA-bezoekerskaart' = 'GA-bezoekerskaart',
  'GA-parkeervergunning voor bewoners (passagiers)' = 'GA-parkeervergunning voor bewoners (passagiers)',
  bezoekersvergunning = 'Bezoekersvergunning',

  codevergunning = 'Codevergunning',
  kraskaartvergunning = 'Kraskaartvergunning',
  mantelzorgvergunning = 'Mantelzorgvergunning',
}

export type PermitZoneGeoJsonResponse = {
  geojson: FeatureCollection | EmptyObject
}

export type ParkingPermit = {
  can_select_zone?: boolean
  discount: number
  forced_license_plate_list: boolean
  max_session_length_in_days: number
  money_balance_applicable: boolean
  no_endtime: boolean
  parking_machine_favorite?: string
  parking_rate: {
    currency: string
    value: number | null
  }
  parking_rate_original: {
    currency: string
    value: number
  }
  payment_zones: PaymentZone[]
  permit_name: string
  permit_type: PermitType
  permit_zone: {
    name: string
    permit_zone_id: string
    show_permit_zone_url: boolean
  }
  report_code: string
  time_balance: number
  time_balance_applicable: boolean
  time_valid_until: string
  visitor_account?: {
    pin: string
    report_code: string
    seconds_remaining: number
  }
  visitor_account_allowed: boolean
}

export type ParkingPermitsEndpointResponse = ParkingPermit[]

export type ParkingPermitsEndpointRequestParams = {
  status?: 'ACTIVE'
}

// Parking-session

export enum ParkingSessionStatus {
  active = 'ACTIVE',
  cancelled = 'CANCELLED',
  completed = 'COMPLETED',
  planned = 'PLANNED',
}

export type VisitorParkingSession = {
  can_edit?: boolean
  end_date_time: string
  no_endtime: boolean
  parking_machine?: string
  payment_zone_id?: string
  ps_right_id: number
  remaining_time: number
  report_code: string
  start_date_time: string
  status: ParkingSessionStatus
  vehicle_id: string
  visitor_name?: string
}

export type ParkingSession = VisitorParkingSession & {
  created_date_time: string
  is_cancelled: boolean
  is_paid: boolean
  parking_cost: {
    currency: string
    value: number
  }
  updated_date_time?: string
}

export type ParkingSessionsEndpointRequest = {
  report_code: string
  status?: ParkingSessionStatus
} & PaginationQueryArgs

export type ParkingSessionHistoryEndpointRequest = {
  report_code: string
} & PaginationQueryArgs

export type VisitorParkingSessionsEndpointRequest = {
  report_code: string
  status?: ParkingSessionStatus
  vehicle_id: string
}

export type ParkingSessionsEndpointResponse = Paginated<ParkingSession>
export type VisitorParkingSessionsEndpointResponse = VisitorParkingSession[]

export type ParkingTransactionsEndpointRequest = PaginationQueryArgs

export type ParkingTransaction = ParkingSession & {
  amount: {
    currency: string
    value: number
  }
  order_type?: ParkingOrderType
}

export enum ParkingOrderType {
  recharge = 'RECHARGE',
  refund = 'REFUND',
  session = 'SESSION',
}

export type ParkingHistorySession = Omit<
  ParkingTransaction,
  'is_paid' | 'parkingCost' | 'money_balance_applicable' | 'time_balance'
> & {
  days?: {
    day_of_week: string
    end_time: string
    start_time: string
  }
  is_payed?: boolean
  is_stopped_early?: boolean
  is_visitor?: boolean
  money_balance_applicable?: boolean
  parking_time?: number
  permit_name?: string
  time_balance_applicable?: boolean
}

export type ParkingSessionHistoryEndpointResponse =
  Paginated<ParkingHistorySession>
export type ParkingTransactionsEndpointResponse = Paginated<ParkingTransaction>

export type ParkingSessionReceiptEndpointResponse = {
  costs: {
    currency: string
    value: number
  }
  parking_cost: {
    currency: string
    value: number
  }
  parking_time: number
  remaining_time: number
}

export type ParkingSessionReceiptEndpointRequestParams = {
  end_date_time: string
  parking_machine?: string
  payment_zone_id?: string
  ps_right_id?: number
  report_code: string
  start_date_time: string
  vehicle_id: string
}
export type ParkingStartSessionEndpointRequestParams = {
  balance?: {
    amount: number
    currency: string
  }
  locale?: string
  parking_session: {
    end_date_time?: string
    parking_machine?: string
    parking_machine_favorite?: boolean
    payment_zone_id?: string
    report_code: string
    start_date_time: string
    vehicle_id: string
  }
  redirect?: {
    merchant_return_url: string
  }
  remove_notifications_ps_right_id?: number
}

export type ParkingEditSessionEndpointRequestParams = {
  balance?: {
    amount: number
    currency: string
  }
  locale?: string
  parking_session: {
    end_date_time: string
    ps_right_id: number
    report_code: string
    start_date_time: string
    vehicle_id: string
  }
  redirect?: {
    merchant_return_url: string
  }
}

export type ParkingOrderResponse = {
  frontend_id: number
  /**
   * The order status can be one of the following:
   * Initiated
   * Processing
   * ...?
   */
  order_status: string
  /**
   * The order type can be one of the following:
   * Parking
   * Payment
   * Both
   * ...?
   */
  order_type: string
  redirect_url?: string
}

export type ParkingDeleteSessionEndpointRequestParams = {
  end_date_time: string
  ps_right_id: number
  report_code: string
  start_date_time: string
  vehicle_id: string
}

export enum ParkingApiLocale {
  en = 'en',
  nl = 'nl',
}

export type RemoveIncreaseBalanceEndpointRequest = {
  balance: {
    amount: number
  }
  locale: ParkingApiLocale
}

export type ParkingManageVisitorTimeBalanceEndpointRequest = {
  report_code: string
  seconds_to_transfer: number
}

export type ParkingSessionOrDummy =
  | ((ParkingSession | VisitorParkingSession) & {dummy?: never})
  | {dummy: true; ps_right_id: number; start_date_time: string}

export type ParkingZoneByMachineEndpointRequest = {
  machineId: string
  report_code: string
}

export type ParkingMachine = {
  address?: string
  id: string
  lat: number
  lon: number
  name: string
  payment_area: string
  start_date: string
}

export type ConfirmBalanceEndpointRequest = {
  order_id: string
  signature: string
  status: string
}
