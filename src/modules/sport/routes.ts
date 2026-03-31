export enum SportRouteName {
  overview = 'SportsOverview',
  sportCategory = 'SportCategory',
  sportItemDetail = 'SportItemDetail',
  ticketPurchase = 'TicketPurchase',
}

export type SportStackParams = {
  [SportRouteName.overview]: undefined
  [SportRouteName.sportCategory]: {id: string; title: string}
  [SportRouteName.sportItemDetail]: {detailName: string}
  [SportRouteName.ticketPurchase]: {activity: string; detailName: string}
}

export enum SportModalName {}

export type SportModalParams = Record<string, never>
