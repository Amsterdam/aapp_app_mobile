import type {PrideEvent} from '@/modules/pride/types'
import type {Service} from '@/modules/service/types'

export enum PrideRouteName {
  details = 'PrideDetails',
  eventDetails = 'PrideEventDetails',
  events = 'PrideEvents',
  overview = 'PrideOverview',
}

export type ModuleStackParams = {
  [PrideRouteName.overview]: undefined
  [PrideRouteName.details]: {id: Service['id']; title: Service['title']}
  [PrideRouteName.events]: {id: Service['id']; title: Service['title']} // added to prevent a typing error, but the params are not used
  [PrideRouteName.eventDetails]: {id: PrideEvent['id']}
}
