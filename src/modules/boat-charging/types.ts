import type {Address} from '@/modules/address/types'
import type {Feature, Point} from 'geojson'

export enum BoatChargingEndpointName {
  boatChargingLocationDetails = 'boatChargingLocationDetails',
  boatChargingLocations = 'boatChargingLocations',
  boatChargingOpenIdConnectConfig = 'boatChargingOpenIdConnectConfig',
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

export type BoatChargingOIDCConfigResponse = {
  client_id: string
  issuer: string
  pkce_required?: string
  redirect_uri?: string
  response_type?: string
  scopes?: string[]
  user_pool_id: string
}
