export enum NewsRouteName {
  newsDashboard = 'NewsDashboard',
}

export type NewsStackParams = {
  [NewsRouteName.newsDashboard]: undefined
}

export enum NewsModalName {}

export type NewsModalParams = Record<string, never>
