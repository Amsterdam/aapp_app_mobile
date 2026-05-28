export enum NewsRouteName {
  article = 'NewsArticle',
  dashboard = 'NewsDashboard',
}

export type NewsStackParams = {
  [NewsRouteName.dashboard]: undefined
  [NewsRouteName.article]: {id: number}
}

export enum NewsModalName {}

export type NewsModalParams = Record<string, never>
