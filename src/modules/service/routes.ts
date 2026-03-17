import type {Service} from '@/modules/service/types'

export enum ServiceRouteName {
  map = 'ServiceMap',
  overview = 'ServiceOverview',
}

export type ServiceStackParams = {
  [ServiceRouteName.overview]: undefined
  [ServiceRouteName.map]: {id: Service['id']; title: Service['title']}
}

export enum ServiceModalName {}

export type ServiceModalParams = Record<string, never>
