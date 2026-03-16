import type {ModuleSlug} from '@/modules/slugs'
import type {Coordinates} from '@/types/location'

export enum AddressCity {
  Amsterdam = 'Amsterdam',
  Weesp = 'Weesp',
}

export type BaseAddress<Type = 'weg'> = {
  city: AddressCity
  coordinates?: Coordinates
  street: string
  type?: Type
}

export type Address = BaseAddress<'adres'> & {
  additionLetter?: string
  additionNumber?: string
  bagId: string
  number: number
  postcode: string
}

export type AddressState = {
  /**
   * User provided address, settable via the user profile
   */
  address?: Address
  /**
   * Error when getting coordinates or fetching address fails
   */
  getLocationIsError: boolean | undefined
  /**
   * Purpose key for high accuracy location
   */
  highAccuracyPurposeKey: HighAccuracyPurposeKey
  /**
   * True when getting coordinates or fetching address
   */
  isGettingLocation?: boolean
  /**
   * GPS provided address
   */
  location?: Address
  /**
   * True when user requests to get the location
   */
  locationFetchRequested: boolean | undefined
  /**
   * User preference for using location or address
   */
  locationType?: LocationType
  /**
   * Custom address set for a specific module
   */
  moduleCustomAddress?: Partial<
    Record<ModuleSlug, Address & {showSaveAsMyAddress: boolean}>
  >
  /**
   * User preference for using location, address or custom
   */
  moduleLocationType?: Partial<Record<ModuleSlug, LocationType>>
  /**
   * A list of recently searched addresses
   */
  recentAddresses: Array<Address>
}

export type AddressList = Array<Address | BaseAddress>

export type PostalArea = {
  postal_area: string
}

export type LocationType = 'address' | 'location' | 'custom'

export enum HighAccuracyPurposeKey {
  PreciseLocationAddressBurningGuide = 'PreciseLocationAddressBurningGuide',
  PreciseLocationAddressConstructionWork = 'PreciseLocationAddressConstructionWork',
  PreciseLocationAddressLookup = 'PreciseLocationAddressLookup',
  PreciseLocationAddressParking = 'PreciseLocationAddressParking',
  PreciseLocationAddressPollingStations = 'PreciseLocationAddressPollingStations',

  PreciseLocationAddressWasteGuide = 'PreciseLocationAddressWasteGuide',
}
