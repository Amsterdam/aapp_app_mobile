export enum ServiceEndpointName {
  serviceMap = 'serviceMap',
  serviceOverview = 'serviceOverview',
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
