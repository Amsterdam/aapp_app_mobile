import type {Address} from '@/modules/address/types'
import type {Feature, Point} from 'geojson'

export enum BoatChargingEndpointName {
  boatChargingInitSession = 'boatChargingInitSession',
  boatChargingLocationDetails = 'boatChargingLocationDetails',
  boatChargingLocations = 'boatChargingLocations',
  boatChargingOpenIdConnectConfig = 'boatChargingOpenIdConnectConfig',
  boatChargingSessions = 'boatChargingSessions',
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

export type EVSE = {
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
  end_date_time: string
  id: string
  kwh: number
  location: BoatChargingLocation
  nrg_status: NRGStatus
  socket_number: string
  start_date_time: string
  station_id: string
  status: SessionStatus
  total_cost: number
}

export type BoatChargingTerms = {
  content: string
  version: number
}

export type BoatChargingSessionInitRequest = {
  email: string
  name: string
  return_url: string
  socket_number: number
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

export type BoatChargingSettings = {
  pre_authorization_amount: number
  session_cleanup_enabled: boolean
  session_expiry_hours: number
  session_expiry_warning_hours: number
  standard_fine: number
}
