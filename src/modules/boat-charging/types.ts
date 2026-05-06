import type {Address} from '@/modules/address/types'
import type {RequirePick} from '@/types/utils'

export enum BoatChargingEndpointName {
  boatChargingLocations = 'boatChargingLocations',
  guestLogin = 'guestLogin',
}

export type BoatChargingLocation = {
  address: RequirePick<Address, 'coordinates'>
  id: string
  name: string
  opening_times: {
    exceptional_closings: number[]
    exceptional_openings: number[]
    regular_hours: number[]
    twentyfourseven: boolean
  }
  total_sockets: number
}

export type BoatChargingLocationsResponse = BoatChargingLocation[]

export enum BoatChargingPointState {
  //TODO: check with states from BE
  free = 'free',
  malfunction = 'malfunction',
  occupied = 'occupied',
}

export type BoatChargingGuestLoginEndpointResponse = {
  access_token: string
  expires_in: number
  token_type: string
}
