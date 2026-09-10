import type {Address} from '@/modules/address/types'
import type {ExceptionDate, VisitingHour} from '@/modules/contact/types'

export enum WasteGuideEndpointName {
  getWasteGuide = 'getWasteGuide',
  getWasteGuideRecyclePoints = 'getWasteGuideRecyclePoints',
}

export enum FractionCode {
  GA = 'GA',
  GFT = 'GFT',
  Glas = 'Glas',
  Papier = 'Papier',
  Plastic = 'Plastic',
  Rest = 'Rest',
  Textiel = 'Textiel',
}

export type Contract = {
  [bagNummeraanduidingId: string]: {hasContract: boolean}
}

export type WasteGuideCalendarEvent = {
  alert: string
  code: FractionCode
  curb_rules_from: string
  curb_rules_to: string
  date: string
  label: string
}

export type WasteType = {
  alert: string
  button_text: string
  code: FractionCode
  curb_rules: string
  days_array: string[]
  frequency: string
  how: string
  info_link?: string
  label: string
  next_date: string
  note: string
  url: string
  where: string
}

export type WasteGuideResponse = {
  calendar: WasteGuideCalendarEvent[]
  is_collection_by_appointment: boolean
  is_residential: boolean
  waste_types: WasteType[]
}

export type WasteGuideRecyclePoint = {
  address: Omit<Address, 'bagId'> & {cityDistrict?: string}
  commercialWaste: boolean
  id: number
  name: string
  openingHours: {
    exceptions: ExceptionDate[]
    regular: VisitingHour[]
  }
}

export type WasteGuideRecyclePointsResponse = WasteGuideRecyclePoint[]
