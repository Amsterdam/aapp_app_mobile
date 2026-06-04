export enum NewsRouteName {
  article = 'NewsArticle',
  dashboard = 'NewsDashboard',
  highlights = 'NewsHighlights',
}

export type NewsStackParams = {
  [NewsRouteName.dashboard]: undefined
  [NewsRouteName.article]: {id: number}
  [NewsRouteName.highlights]: undefined
}

export enum NewsModalName {}

export type NewsModalParams = Record<string, never>
