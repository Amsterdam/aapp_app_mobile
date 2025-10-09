export enum ElectionsEndpointName {
  pollingStations = 'pollingStations',
}

export type PollingStation = {
  address1: string
  address2: string
  categories: ElectionsCategory[]
  id: number
  isOpen: boolean
  lastUpdate: {
    state: number
    time: string | null
  }
  name: string
  numbers: string[]
  openingTimes: number[][]
  position: {
    lat: number
    lng: number
  }
}

export enum ElectionsCategory {
  disabledParking = 'disabled_parking',
  hearingImpaired = 'hearing_impaired',
  ptWheelchair = 'pt_wheelchair',
  pysicalLimitation = 'pysical_limitation',
  visionImpaired = 'vision_impaired',
  wheelchairHelp = 'wheelchair_help',
}

export type PollingStationsResponse = PollingStation[]

export enum PollingStationsListBottomSheetVariant {
  address = 'address',
  pollingStation = 'pollingStation',
}
