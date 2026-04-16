import type {Address} from '@/modules/address/types'
import type {Coordinates} from '@/types/location'

export type ImageSource = {
  description: string
  filename: string
  image_id: string
  size?: string
  url: string
}

export type Image = {
  sources: ImageSources
  type: string
}

export type ImageSources = {
  '220px': ImageSource
  '460px': ImageSource
  '700px': ImageSource
  '80px': ImageSource
  orig: ImageSource
}

export enum ContactEndpointName {
  getCityOffices = 'getCityOffices',
  getWaitingTimes = 'getWaitingTimes',
}

export type CityOffice = {
  address: Address
  addressContent?: {
    html: string
    title: string
  }
  appointment?: {
    text: string
    url: string
  }
  coordinates: Coordinates
  directionsUrl: string
  identifier: string
  image: Image
  title: string
  visitingHours: {
    exceptions: ExceptionDate[]
    regular: VisitingHour[]
  }
  visitingHoursContent?: string
}

export type VisitingHour = {
  dayOfWeek: number
} & OpeningAndClosingTimes

export type ExceptionDate = {
  date: string
  description: string | null
} & Partial<OpeningAndClosingTimes>

export type OpeningAndClosingTimes = {
  closing: HoursAndMinutes
  opening: HoursAndMinutes
}

export type HoursAndMinutes = {
  hours: number
  minutes: number
}
