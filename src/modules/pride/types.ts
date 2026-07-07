import type {Address} from '@/modules/address/types'
import type {
  ALL_DATES_LABEL,
  TODAY_LABEL,
  TOMORROW_LABEL,
  THIS_WEEKEND_LABEL,
  CHOOSE_DATE_LABEL,
} from '@/modules/pride/constants'
import type {Dayjs} from '@/utils/datetime/dayjs'

export enum PrideEndpointName {
  events = 'prideEvents',
}
export type PrideEventsResponse = Array<PrideEvent>

export type PrideEvent = {
  address: Address
  date_end: string | null
  date_start: string
  description: string
  id: string
  time: string | null
  title: string
  type: string
  website: string
}

export type PrideEventFormValues = {
  customDate: Dayjs
  date:
    | typeof ALL_DATES_LABEL
    | typeof TODAY_LABEL
    | typeof TOMORROW_LABEL
    | typeof THIS_WEEKEND_LABEL
    | typeof CHOOSE_DATE_LABEL
  type: string
}
