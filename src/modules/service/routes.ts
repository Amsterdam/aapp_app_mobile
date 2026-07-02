import type {Service} from '@/modules/service/types'

export enum ServiceRouteName {
  map = 'ServiceMap',
  overview = 'ServiceOverview',
}

export type ModuleStackParams = {
  [ServiceRouteName.overview]: undefined
  [ServiceRouteName.map]: {id: Service['id']; title: Service['title']}
}
