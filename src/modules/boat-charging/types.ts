import type {Address} from '@/modules/address/types'
import type {Feature, Point} from 'geojson'

export enum BoatChargingEndpointName {
  boatChargingLocationDetails = 'boatChargingLocationDetails',
  boatChargingLocations = 'boatChargingLocations',
  guestLogin = 'guestLogin',
}

export type BoatChargingGuestLoginEndpointResponse = {
  access_token: string
  expires_in: number
  token_type: string
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

type ChargingStation = {
  evses: []
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
