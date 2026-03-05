export enum ServiceEndpointName {
  mapsOverview = 'mapsOverview',
  serviceMap = 'serviceMap',
}

export type ServiceItem = {
  /**
   * Svg path data
   */
  icon: string
  id: number
  title: string
}

export type ServiceOverViewResponse = ServiceItem[]
