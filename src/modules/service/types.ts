export enum ServiceEndpointName {
  serviceMap = 'serviceMap',
  serviceOverview = 'serviceOverview',
}

export type ServiceItem = {
  /**
   * Svg path data
   */
  icon: string
  id: string
  title: string
}

export type ServiceOverviewResponse = ServiceItem[]
