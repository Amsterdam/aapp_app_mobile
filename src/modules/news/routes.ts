export enum NewsRouteName {
  article = 'NewsArticle',
  dashboard = 'NewsDashboard',
  highlights = 'NewsHighlights',
  liveblog = 'NewsLiveblog',
}

export type NewsStackParams = {
  [NewsRouteName.dashboard]: undefined
  [NewsRouteName.article]: {id: number}
  [NewsRouteName.liveblog]: {id: number; isActive: boolean}
  [NewsRouteName.highlights]: undefined
}

export enum NewsModalName {}

export type NewsModalParams = Record<string, never>
