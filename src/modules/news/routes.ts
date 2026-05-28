export enum NewsRouteName {
  article = 'NewsArticle',
  dashboard = 'NewsDashboard',
}

export type NewsStackParams = {
  [NewsRouteName.dashboard]: undefined
  [NewsRouteName.article]: {id: string}
}

export enum NewsModalName {}

export type NewsModalParams = Record<string, never>
