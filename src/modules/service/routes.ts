import type {ServiceItem} from '@/modules/service/types'

export enum ServiceRouteName {
  map = 'ServiceMap',
  overview = 'ServiceOverview',
}

export type ServiceStackParams = {
  [ServiceRouteName.overview]: undefined
  [ServiceRouteName.map]: {id: ServiceItem['id']}
}

export enum ServiceModalName {}

export type ServiceModalParams = Record<string, never>
