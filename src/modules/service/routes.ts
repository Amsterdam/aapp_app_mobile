export enum ServiceRouteName {
  overview = 'ServiceOverview',
}

export type ServiceStackParams = {
  [ServiceRouteName.overview]: undefined
}

export enum ServiceModalName {}

export type ServiceModalParams = Record<string, never>
