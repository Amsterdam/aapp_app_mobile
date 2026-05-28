import type {Paginated, PaginationQueryArgs} from '@/types/api'
import type {ImageURISource} from 'react-native'

export type NewsArticleBase = {
  id: number
  modification_datetime: string
  publication_datetime: string
  title: string
}
export type NewsArticleSummary = NewsArticleBase & {
  images: Pick<ImageURISource, 'uri' | 'width' | 'height'>[]
}

export enum NewsEndpointName {
  article = 'NewsArticle',
  articles = 'NewsArticles',
}

export type NewsArticleResponse = NewsArticleBase & {
  content: string
}

export type NewsArticlesResponse = Paginated<NewsArticleSummary>

export type District =
  | 'west'
  | 'noord'
  | 'zuid'
  | 'oost'
  | 'centrum'
  | 'nieuw-west'
  | 'zuidoost'
  | 'weesp'

export type NewsArticlesType =
  | {
      district?: never
      type: 'article' | 'highlight' | 'liveblog'
    }
  | {
      district: District
      type: 'district'
    }

export type NewsArticlesQueryArgs = PaginationQueryArgs & NewsArticlesType
