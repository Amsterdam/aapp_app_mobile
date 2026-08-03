import type {Address} from '@/modules/address/types'
import type {PaginationQueryArgs} from '@/types/api'
import type {Feature, Point} from 'geojson'

export enum BoatChargingEndpointName {
  boatChargingCancelSession = 'boatChargingCancelSession',
  boatChargingInitSession = 'boatChargingInitSession',
  boatChargingLocationDetails = 'boatChargingLocationDetails',
  boatChargingLocations = 'boatChargingLocations',
  boatChargingOpenIdConnectConfig = 'boatChargingOpenIdConnectConfig',
  boatChargingSession = 'boatChargingSession',
  boatChargingSessionCostBreakdown = 'boatChargingSessionCostBreakdown',
  boatChargingSessions = 'boatChargingSessions',
  boatChargingSettings = 'boatChargingSettings',
  boatChargingSocketStatus = 'boatChargingSocketStatus',
  boatChargingStartSession = 'boatChargingStartSession',
  boatChargingStopSession = 'boatChargingStopSession',
  boatChargingTerms = 'boatChargingTerms',
}

export type BoatChargingPointFeature = Feature<Point, BoatChargingLocation>

export type BoatChargingGeoJSON = {
  features: Array<BoatChargingPointFeature>
  type: 'FeatureCollection'
}

export type BoatChargingLocationDetailsResponse = BoatChargingLocation & {
  charging_stations: ChargingStation[]
  tariff: {
    charging_time_price_per_hour: number
    energy_price_per_kwh: number
    flat_fee_price: number
    id: string
    parking_time_price_per_hour: number
  }
  total_sockets: number
}

export type BoatChargingLocation = {
  address: Address
  id: string
  max_kw: number | null
  name: string
  opening_times: {
    exceptional_closings: unknown[] //TODO: add typing
    exceptional_openings: unknown[] //TODO: add typing
    regular_hours: unknown[] //TODO: add typing
    twentyfourseven: boolean
  }
  status: ChargingPointStatus
  total_sockets: number
}

export type Connector = {
  connector_id: number
  format: string
}

export type EVSE = {
  connectors: Connector[]
  display_name: string
  evse_id: string
  id: string
  ocpp_evse_id: number
  status: ChargingPointStatus
}

export type ChargingStation = {
  evses: EVSE[]
  id: string
  location_id: string
  status: ChargingPointStatus
}

export enum ChargingPointStatus {
  INOPERATIVE = 'INOPERATIVE',
  OCCUPIED = 'OCCUPIED',
  OFFLINE = 'OFFLINE',
  OPERATIVE = 'OPERATIVE',
  UNKNOWN = 'UNKNOWN',
}

export enum BoatChargingPointState {
  free = 'free',
  malfunction = 'malfunction',
  occupied = 'occupied',
}

export enum NRGStatus {
  Created = 1,
  CheckedOut = 2,
  Charging = 3,
  Completed = 4,
  Cancelled = 5,
}

export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export enum SocketStatus {
  CHARGING = 'CHARGING',
  FINISHING = 'FINISHING',
  PREPARING = 'PREPARING', // important: cable is plugged in, without that session can not be started
  SUSPENDED_EV = 'SUSPENDED_EV', // boat refusing to charge (e.g. battery full)
  SUSPENDED_EVSE = 'SUSPENDED_EVSE', // EVSE (charging station) refusing to charge
}

export type BoatChargingOIDCConfigResponse = {
  client_id: string
  issuer: string
  pkce_required?: string
  redirect_uri?: string
  response_type?: string
  scopes?: string[]
  user_pool_id: string
}

export type BoatChargingSession = {
  created_date_time: string
  currency: 'EUR'
  email: string
  end_date_time?: string
  id: string
  kwh: number
  location: BoatChargingLocation
  nrg_status: NRGStatus
  socket_number: string
  start_date_time: string
  station_id: string
  status: SessionStatus
  stop_reason?: BoatChargingStopReason
  total_cost: number
}

export type BoatChargingSessionsEndpointRequest = {
  status?: SessionStatus
} & PaginationQueryArgs

export type BoatChargingTerms = {
  content: string
  version: number
}

export type BoatChargingSessionInitRequest = {
  email: string
  name: string
  return_url: string
  socket_number: string
  station_id: string
}

export type BoatChargingSessionInitResponse = {
  checkout_url: string
}

export type BoatChargingSocketStatusResponse = {
  status: ChargingPointStatus
  substatus: SocketStatus
}

export enum SessionLengthStatus {
  expiry = 'expiry',
  expiryWarning = 'expiryWarning',
  normal = 'normal',
}

/**
 * Boat charging settings response type. All fields are nullable, as the backend may not have set them yet.
 */
export type BoatChargingSettings = {
  pre_authorization_amount: number | null
  session_cleanup_enabled: boolean | null
  session_expiry_hours: number | null
  session_expiry_warning_hours: number | null
  standard_fine: number | null
  vat_fraction?: number | null
}

export type EVSEWithStation = EVSE & {name: string; station: ChargingStation}

export type BoatChargingPaymentResultStatus = 'paid' | 'unpaid'

export type BoatChargingSelectSocketFormValues = {
  selectedSocket: BoatChargingSelectSocketFormSelectedSocket
}

export type BoatChargingSelectSocketFormSelectedSocket = {
  socketNumber: string
  stationId: string
}

export enum BoatChargingStopReason {
  /**
   * User cancelled a paid session before charging started; pre-auth refunded.
   */
  CANCELLED = 'cancelled',
  /**
   * A session that never started charging lapsed (stale or expired); any payment refunded.
   */
  EXPIRED = 'expired',
  /**
   * User stopped charging via the stop endpoint.
   */
  MANUAL = 'manual',
  /**
   * Cleanup stopped charging because the estimated cost neared the pre-auth budget.
   */
  OUT_OF_BALANCE = 'outOfBalance',
  /**
   * Cleanup force-stopped a charging session that exceeded the session time limit.
   */
  TIME_LIMIT = 'timeLimit',
  /**
   * The CPMS transaction was stopped externally (e.g. cable unplugged).
   */
  UNPLUGGED = 'unplugged',
}

export type BoatChargingSessionCostBreakdownResponse = {
  cdrTotalExclVat: number
  currency: string
  endDateTime: string
  items: BoatChargingSessionCostBreakdownItem[]
  startDateTime: string
  totalEnergyKwh: number
  totalExclVat: number
  totalInclVat: number
  totalTimeHours: number
}

export type BoatChargingSessionCostBreakdownItem = {
  costExclVat: number
  costInclVat: number
  type: BoatChargingCostBreakdownItemType
  unitPrice: number
  vatPercent: number
  volume: number
}

export enum BoatChargingCostBreakdownItemType {
  ENERGY = 'ENERGY',
  FLAT = 'FLAT',
  PARKING_TIME = 'PARKING_TIME',
  TIME = 'TIME',
}
