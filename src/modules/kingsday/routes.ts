import type {Service} from '@/modules/service/types'

export enum KingsdayRouteName {
  details = 'KingsdayDetails',
  overview = 'KingsdayOverview',
}

export type KingsdayStackParams = {
  [KingsdayRouteName.overview]: undefined
  [KingsdayRouteName.details]: {id: Service['id']; title: Service['title']}
}

export enum KingsdayModalName {}

export type KingsdayModalParams = Record<string, never>
