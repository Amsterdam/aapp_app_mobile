import type {Service} from '@/modules/service/exports/types'

export enum KingsdayRouteName {
  details = 'KingsdayDetails',
  overview = 'KingsdayOverview',
}

export type ModuleStackParams = {
  [KingsdayRouteName.overview]: undefined
  [KingsdayRouteName.details]: {id: Service['id']; title: Service['title']}
}
